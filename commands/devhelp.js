module.exports = {
	name: 'devhelp',
    description: 'Gets help from pre-defined documentation.',
    isHidden:false,
	execute(message, args,sudo) {
        if(args[0] === 'js'){
            return message.channel.send(`https://discord.js.org/#/docs/main/stable/class/${args[1]}`);
        }else if(args[0] === "py"){
            return message.channel.send(`https://discordpy.readthedocs.io/en/latest/api.html#${args[1].toLowerCase()}`)
        }else if(args[0] === 'help'){
            const Discord = require("discord.js");
            const embed = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('Devhelp help')
            .setAuthor('Bash')
            .setDescription(`
            Retrieves a link to documentation for Python and Javascript discord libraries.
            To get a Javascript link, use ~devhelp js toLookup.
            To get a Python link, use ~devhelp py toLookup.
            `);
            return message.channel.send(embed);
        }else{
            return message.channel.send(`Available sub-commands:js,py`);
        }
	},
};