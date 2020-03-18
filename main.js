const Discord = require('discord.js');
const client = new Discord.Client();
const {token,prefix} = require('config.json');
client.once('ready', () => {
	console.log('Ready!');
});

client.login('token');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
client.on('message', message => {
    
    const args = message.content.slice(prefix.length).split(/ +/);
	if(message.content == 'Eric...'){
        return message.channel.send('You know, your stuff may be tamper-proof, but you can\'t stop me, right?');
    }
});