//login code
const Discord = require('discord.js');
const client = new Discord.Client();
const {token,prefix} = require('./config.json');
client.once('ready', () => {
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

//vars
var logged = true;
var user = "bash";
var scripting = false;
var collect = new Discord.Collection;
var currentName = "null";
var isFirstMsg = false;
//exported functions
function changeUser(name){
    user = name;
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
        return true;
    }
    return false;
}
function setScripting(set){
    scripting = true;
    isFirstMsg = true;
}
exports.loggedIn = loggedIn;
exports.changeUser = changeUser;
exports.getName = getName;
exports.verifySudo = verifySudo;
exports.hasScript = hasScript;
exports.getScripted = getScripted;
exports.setCurrentScript = setCurrentScript;
exports.removeScript = removeScript;
exports.setScripting = setScripting;

//on message, do...
client.on('message', message => {
    var args = message.content.slice(prefix.length).split(/ +/);
    //custom written responses
	if(message.content == 'Eric...'){
        return message.channel.send('You know, your stuff may be tamper-proof, but you can\'t stop me, right?');
    }
    const lower = message.content.toLowerCase();
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

    //scripting
    if(message.content.toLowerCase() === "end" && scripting){
        scripting = false;
        currentName = "null";
        return message.channel.send("Script ended.");
    }
    if(scripting){
        if(isFirstMsg){
            isFirstMsg = false;
            return;
        }
        if(message.author.id === '645314809453084697'){
            return;
        }
        if(collect.has(currentName)){
            var arr = collect.get(currentName);
            if(message.content.startsWith("$")){
                arr.push(`${message.content}`);
            }else if(message.content.endsWith("--literal")){
                arr.push(`${message.content.substr(0,message.content.length - 9)}`);
            }else{
                arr.push(`~${message.content}`);
            }
            collect.set(currentName,arr);
        }else{
            if(message.content.startsWith("$")){
                collect.set(currentName,[`${message.content}`]);
            }else if(message.content.endsWith("--literal")){
                collect.set(currentName,[`${message.content.substr(0,message.content.length - 9)}`]);
            }else{
                collect.set(currentName,[`~${message.content}`]);
            }
        }
        return;
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