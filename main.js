const Discord = require('discord.js');
const client = new Discord.Client();
const {token,prefix} = require('./config.json');
client.once('ready', () => {
	console.log('Ready!');
});
const fs = require('fs');
client.login(token);
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
var logged = true;
var user = "bash";
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
exports.loggedIn = loggedIn;
exports.changeUser = changeUser;
exports.getName = getName;
exports.verifySudo = verifySudo;
client.on('message', message => {
    var args = message.content.slice(prefix.length).split(/ +/);
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
    if(message.content.toLowerCase().includes("shit")|| message.content.toLowerCase().includes("fuck")){
        message.delete();
        return message.channel.send("Please don't swear.");
    }
    if(message.content.toLowerCase() === 'swear'){
        return message.channel.send("How creative...");
    }
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
    if(!client.commands.has(commandName)){
        return message.channel.send('No such command.');
    }
    const command = client.commands.get(commandName);
    try{
        command.execute(message,args,sudo);
    }catch(error){
        console.error(error);
        message.reply('Error trying to execute that command!');
    }
});