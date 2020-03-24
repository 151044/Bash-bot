module.exports = {
    name:"warn",
    description:"Warns a user via direct message.",
    isHidden:false,
    execute(message,args,sudo){
        const main = require("../main.js");
        if(!sudo){
            return message.channel.send("Requires root!");
        }
        if(!main.verifySudo(main.getName(),args[args.length -  1],message)){
            return;
        }
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(`You cannot warn people!`);
        }
        message.delete();
        var m;
        if(main.getName() === 'root'){
             m = message.channel.send(main.embedFrom("","",`${message.content.substring(1,message.content.length)}`));
        }else{
            m = message.channel.send(main.embedFrom("","",`${message.content.substring(1,message.content.length - args[args.length - 1].length)}`));
        }
        var hasFlag = false;
        var sliced = args.length - 1;
        if(message.content.includes("--hide") || message.content.includes("-h")){
            hasFlag = true;
            sliced--;
        }
        var warn = message.mentions.users.first();
        warn.createDM().then(res => {
            res.send(`You have been warned by${message.author} for ${args.slice(1,sliced).join(" ")}.`);
        });
        if(hasFlag){
            m.then(mk =>{
                mk.delete();
            });
        }

    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Warn",`
        ${this.name}---${this.description}
        
        Syntax:
        ~warn [user] [message] {-h/--hide}

        Arguments:
        user---The user to warn.
        message---The reason for warning.

        Optional Arguments:
        [-h/--hide]---Whether to hide the message which warned the user.

        Requires sudo:
        True, and needs admin privilege as well.
        
        Note:
        Not applicatable.

        `);
    }
}