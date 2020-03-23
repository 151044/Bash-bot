module.exports = {
    name : 'pacman',
    description:'The pacman package manager.',
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
        message.channel.send("/\n/\n");
        if(main.getName() === 'root'){
            message.channel.send(`${message.content.substring(1,message.content.length)}`);
        }else{
            message.channel.send(`${message.content.substring(1,message.content.length - args[args.length - 1].length)}`);
        }
        if(args[0] === '-Syu'){
            message.channel.send('Starting full system upgrade...');
            message.channel.send('Kernel panic ---- System fully upgraded.');
        }else if(args[0] === '-S'){
            if(install.includes(args[1])){
                return message.channel.send(`Successfully installed package ${args[1]}`);
            }else if(args[1] === 'pacman'){
                return message.channel.send('Fancy a game of pacman?')
            }else if(args[1] === 'apt'){
                return message.channel.send(`Shoudn't this be the *superior* package manager, or something?`);
            }else{
                return message.channel.send(`Cannot find package ${args[1]}`);
            }
        }
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Pacman ",`
        adminlogin---${this.description}
        
        Syntax:
        ~pacman [-Syu]
        ~pacman [-S] [package]

        Arguments:
        -Syu---Upgrades the system.
        -S---Installs a package.
        package---The package to install.

        Optional Arguments:
        None

        Requires sudo:
        True
        
        Note:
        Try to install different packages for an interesting experience.

        `);
    }
}