//login code
const Discord = require('discord.js');
const client = new Discord.Client();
const {token,prefix} = require('./config.json');

//vars
var logged = true;
var user = "bash";
var scripting = false;
var collect = new Discord.Collection();
var currentName = "null";
var toSkip = 0;
var literalScript = false;
var userScript = "undefined";
var isSingleUser = false;
var write = {
    loggedIn:user
};
var writeTo = {
};
var hasBotComment = 'no';

//On login, restore from state
client.once('ready', () => {
    var state = JSON.parse(fs.readFileSync('./state/appState.json'));
    user = state.loggedIn;
    if(user === 'No user.'){
        loggedIn = false;
    }
    var obj = JSON.parse(fs.readFileSync("./state/script.json"));
    for(var name in obj){
        collect.set(name,obj[name]);
    }
    console.log('Ready!');
});
const fs = require('fs');
client.login(token);

//commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//exported functions
function changeUser(name){
    user = name;
    write.loggedIn = name;
    fs.writeFile('./state/appState.json',JSON.stringify(write,null,4),(err) => {
        if(err){
            throw err;
        }
        console.log("Written change to file.");
    });
}
function loggedIn(log){
    logged = log;
}
function getName(){
    return user;
}
function verifySudo(toChk,passwd,message){
    if(toChk === "root"){
        return true;
    }
    const {sudoers} = require("./commands/sudoers.json");
    if(!sudoers.includes(toChk)){
        message.channel.send("Username is not in the sudoers file. This incident will be reported.");
        return false;
    }
    if(!((new Map(Object.entries(JSON.parse(fs.readFileSync("./commands/passwd.json",'utf8')))).get(toChk)) === passwd)) {
        message.channel.send("Incorrect password. Please try again.");
        return false;
    }
    return true;
}
function hasScript(name){
    return collect.has(name);
}
function getScripted(name){
    return collect.get(name);
}
function setCurrentScript(name){
    currentName = name;
}
function removeScript(name){
    if(collect.has(name)){
        collect.delete(name);
        writeTo = {   
        };
        for(var[k,v] of collect){
            writeTo[k] = v;
        }
        fs.writeFile('./state/script.json',JSON.stringify(writeTo,null,4),(err) =>{
            if(err) throw err;
            console.log("Wrote script file.");
        });
        return true;
    }
    return false;
}
function setScripting(set){
    scripting = true;
    toSkip++;
}
function deleteAllScript(){
    collect.sweep(element =>{
        return true;
    });
    writeTo = { 
    };
    fs.writeFile('./state/script.json',JSON.stringify(writeTo,null,4),(err) =>{
        if(err) throw err;
        console.log("Wrote script file.");
    });
}
function setLiteral(){
    literalScript = true;
    toSkip++;
}
function setSingleUser(message){
    isSingleUser = true;
    userScript = message.author.id;
    toSkip++;
}
function getCommand(name,readHidden){
    if(!client.commands.has(name)){
        return client.commands.get("nocmd");
    }
    var cmd = client.commands.get(name);
    if(cmd.isHidden && !readHidden){
        return client.commands.get("nocmd");
    }
    return cmd;
}
function getCommands(readHidden){
    var ret = [];
    client.commands.each(cmd =>{
        if(!readHidden && cmd.isHidden){
            return;
        }
        if(cmd.name === 'nocmd'){
            return;
        }
        ret.push(cmd);
    });
    return ret;
}
function hasCommand(name,showActual){
    if(!client.commands.has(name)){
        return false;
    }
    if(client.commands.get(name).isHidden && showActual){
        return true;
    }
    if(!client.commands.get(name).isHIdden){
        return true;
    }
    return false;
}
function embedFrom(author,title,msg){
    const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(title)
    .setAuthor(author)
    .setDescription(msg);
    return embed;
}
function listAllScripts(){
    return Array.from(collect.keys());
}

//exports
exports.loggedIn = loggedIn;
exports.changeUser = changeUser;
exports.getName = getName;
exports.verifySudo = verifySudo;
exports.hasScript = hasScript;
exports.getScripted = getScripted;
exports.setCurrentScript = setCurrentScript;
exports.removeScript = removeScript;
exports.setScripting = setScripting;
exports.deleteAllScript = deleteAllScript;
exports.setLiteral = setLiteral;
exports.setSingleUser = setSingleUser;
exports.getCommand = getCommand;
exports.getCommands = getCommands;
exports.embedFrom = embedFrom;
exports.hasCommand = hasCommand;
exports.listAllScripts = listAllScripts;

//on message, do...
client.on('message', message => {
    var args = message.content.slice(prefix.length).split(/ +/);

    //scripting
    if(message.content.toLowerCase() === "end" && scripting){
        scripting = false;
        currentName = "null";
        literalScript = false;
        isSingleUser = false;
        writeTo = {

        };
        for(var[k,v] of collect){
            writeTo[k] = v;
        }
        fs.writeFile('./state/script.json',JSON.stringify(writeTo,null,4),(err) =>{
            if(err) throw err;
            console.log("Wrote script file.");
        });
        return message.channel.send("Script ended.");
    }
    if(scripting){
        if(toSkip > 0){
            toSkip--;
            return;
        }
        if(isSingleUser){
            if(!(message.author.id === userScript)){
                return;
            }
        }
        if(message.author.id === '645314809453084697' || message.author.id === '690833293167296524'){
            return;
        }
        if(collect.has(currentName)){
            var arr = collect.get(currentName);
            if(message.content.startsWith("$")){
                arr.push(`${message.content}`);
            }else if(message.content.endsWith("--literal")){
                arr.push(`${message.content.substr(0,message.content.length - 9)}`);
            }else if(literalScript){
                arr.push(`${message.content}`);
            }else{
                arr.push(`~${message.content}`);
            }
            collect.set(currentName,arr);
        }else{
            if(message.content.startsWith("$")){
                collect.set(currentName,[`${message.content}`]);
            }else if(message.content.endsWith("--literal")){
                collect.set(currentName,[`${message.content.substr(0,message.content.length - 9)}`]);
            }else if(literalScript){
                collect.set(currentName,[`${message.content}`]);
            }else{
                collect.set(currentName,[`~${message.content}`]);
            }
        }
        return;
    }

    //custom written responses
	if(message.content == 'Eric...'){
        return message.channel.send('You know, your stuff may be tamper-proof, but you can\'t stop me, right?');
    }
    const lower = message.content.toLowerCase();
    if(message.content === 'bad bot'){
        if(hasBotComment === 'no' || hasBotComment === 'bad'){
            hasBotComment = 'bad';
            return message.channel.send('Say what you will, I don\'t actually care about you anyways.');
        }
        hasBotComment = 'bad';
        return message.channel.send('You are sending me mixed messages...');
    }
    if(message.content === 'good bot'){
        if(hasBotComment === 'no' || hasBotComment === 'good'){
            hasBotComment = 'good';
            return message.channel.send('Thanks!That\'s very kind of you.');
        }
        hasBotComment = 'good';
        return message.channel.send('You are sending me mixed messages...');
    }
    hasBotComment = 'no';
    if(lower === 'f'){
        return message.channel.send('Respects have been paid.');
    }
    if(lower === 'alexa'){
        return message.channel.send('I am not going to play Despacito again! Ever!');
    }
    if(message.content === "I am your father."){
        return message.channel.send('Hello, Luke!');
    }
    if(lower === 'this is the word of the lord.'){
        return message.channel.send("Thanks be to God.");
    }

    //checks
    if(!message.content.startsWith(prefix)){
        return;
    }
    if(!(logged) && !(message.content.includes("login"))){
        return message.channel.send("Not logged in.");
    }
    var commandName = args.shift().toLowerCase();
    var sudo = false;
    if(commandName === 'sudo'){
        commandName = args[0];
        args = args.slice(1);
        sudo = true;
    }
    if(!args.length && sudo){
        return message.channel.send("Sudo what?");
    }
    if(user === 'root'){
        sudo = true;
    }
    if(!client.commands.has(commandName)){
        return message.channel.send('No such command.');
    }

    //execution
    const command = client.commands.get(commandName);
    try{
        command.execute(message,args,sudo);
    }catch(error){
        console.error(error);
        message.reply('Error trying to execute that command!');
    }
});