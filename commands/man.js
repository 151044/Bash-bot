module.exports = {
    name:"man",
    description:"Shows a description for a command.Use man --all for all commands.",
    isHidden:false,
    execute(message,args,sudo){
        const main = require("../main.js");
        var str = ""
        var showActual = false;
        var verbose = false;
        var ignore = false;
        if(args.includes("--hidden") || args.includes("-h")){
            showActual = true;
        }
        if(args.includes("--verbose") || args.includes("-v")){
            verbose = true;
        }
        if(args.includes("--no-restrictions")){
            ignore = true;
        }
        if(args[0] === '--all' || args[0] === "-a"){
            if(verbose && !ignore){
                return message.channel.send("The -v option cannot be used with -a.")
            }
            for(const cmd of main.getCommands(showActual)){
                if(verbose){
                    message.channel.send(cmd.fullMsg());
                }else{
                    str += `${cmd.name}---${cmd.description}`;
                    str += '\n';
                }
            }
            if(!verbose){
            const Discord = require("discord.js");
            const embed = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('Man list')
            .setAuthor('Bash')
            .setDescription(str);
            message.channel.send(embed);
            }
        }else{
            var cmd = main.getCommand(args[0],showActual);
            if(!main.hasCommand(args[0],showActual)){
                return message.channel.send(`No manual found for ${args[0]}.`);
            }
            if(verbose){
                return message.channel.send(cmd.fullMsg());
            }
            message.channel.send(`${cmd.name}---${cmd.description}`);
        }
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Manual",`
        man---${this.description}
        
        Syntax:
        ~man [command] {-v/--verbose/-h/--hidden}
        ~man [-a/--all]

        Arguments:
        command---The command to lookup.

        Optional Arguments:
        [-v/--verbose] Show more detailed information.
        [-h/--hidden] Show hidden commands.

        Requires sudo:
        False
        
        Note:
        The -a/--all option shows all commads and a short description.

        `);
    }
}