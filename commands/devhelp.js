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
        }else if(args[0] === 'java'){
            return message.channel.send(`https://ci.dv8tion.net/job/JDA/javadoc/net/dv8tion/jda/${args[1]}.html`);
        }else{
            return message.channel.send(`Available sub-commands:js,py,java`);
        }
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Developer Help",`
        devhelp---${this.description}
        
        Syntax:
        ~devhelp [lang] [Class]

        Arguments:
        lang--The language to look up. Currently, it only accepts js, java and py.

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        This command access the URL of documentation directly

        `);
    }
};