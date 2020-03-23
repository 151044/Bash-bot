module.exports = {
    name:"man",
    description:"Shows a description for a command.Use man --all for all commands.",
    isHidden:false,
    execute(message,args,sudo){
        const main = require("../main.js");
        var str = ""
        if(args[0] === '--all'){
            for(const cmd of main.getCommands(false)){
                str += `${cmd.name}---${cmd.description}`;
                str += '\n'
            }
            const Discord = require("discord.js");
            const embed = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('Man list')
            .setAuthor('Bash')
            .setDescription(str);
            message.channel.send(embed);
        }else{
            var cmd = main.getCommand(args[0],false)
            message.channel.send(`${cmd.name}---${cmd.description}`);
        }
    }
}