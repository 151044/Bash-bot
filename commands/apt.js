module.exports = {
    name : 'apt',
    description:'The apt package manager.',
    isHidden:false,
    execute(message,args,sudo){
        const {install} = require("./pacs.json");
        if(!sudo){
            return message.channel.send('Requires root!');
        }
        const main = require("../main.js");
        if(!main.verifySudo(main.getName(),`${args[args.length - 1]}`,message)){
            message.delete();
            return;
        }
        message.delete();
        if(main.getName() === 'root'){
            message.channel.send(main.embedFrom("","",`${message.content.substring(1,message.content.length)}`));
        }else{
            message.channel.send(main.embedFrom("","",`${message.content.substring(1,message.content.length - args[args.length - 1].length)}`));
        }
        if(args[0] === 'install'){
            if(install.includes(args[1])){
                if(args[1] === 'zoom'){
                    message.channel.send("It works, but I don't really like it.")
                }
                return message.channel.send(`Successfully installed package ${args[1]}`);
            }else if(args[1] === 'sudo'){
                return message.channel.send('Using sudo to install sudo. How... *apt*.')
            }else if(args[1] === 'pacman'){
                return message.channel.send(`It is here, no fuss!`);
            }else if(args[1] === 'windows'){
                message.channel.send("This is a windows-free zone. Get out!");
                return message.channel.send('Burn the heretic!');
            }else{
                return message.channel.send(`Cannot find package ${args[1]}`);
            }
        }else if(args[0] === 'remove'){
            if(install.includes(args[1])){
                return message.channel.send(`Sucessfully removed ${args[1]}`);
            }else{
                return message.channel.send(`Cannot find package ${args[1]}`);
            }
        }
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","apt",`
        apt---${this.description}
        
        Syntax:
        ~apt [install/remove] [package name]

        Arguments:
        install---Installs a package, if available.
        remove---Removes a package, if possible

        Optional Arguments:
        None

        Requires sudo:
        True

        Note:
        Try to install different packages for an interesting experience.

        `);
    }
}