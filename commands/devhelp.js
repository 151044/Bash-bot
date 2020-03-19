module.exports = {
	name: 'devhelp',
	description: 'The devhelp function.',
	execute(message, args,sudo) {
        if(args[0] === 'js'){
            return message.channel.send(`https://discord.js.org/#/docs/main/stable/class/${args[1]}`);
        }else if(args[0] === "py"){
            return message.channel.send(`https://discordpy.readthedocs.io/en/latest/api.html#${args[1].toLowerCase()}`)
        }else{
            return message.channel.send(`Available sub-commands:js,py`);
        }
	},
};