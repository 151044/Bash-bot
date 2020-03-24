module.exports = {
    name : "fsck",
    description:"Checks file system for errors.",
    isHidden:false,
    execute(message,args,sudo){
        if(!sudo){
            return message.channel.send('This action is potentially destructive. Please use root.')
        }
        const main = require("../main.js");
        if(!main.verifySudo(main.getName(),`${args[args.length - 1]}`,message)){
            message.delete();
            return;
        }
        message.delete();
        message.channel.send(main.embedFrom("","",`${message.content.substring(1,message.content.length - args[args.length - 1].length)}`));
        message.channel.send(`Checking ${args[0]}`);
        if(Math.floor(Math.random() * 2) == 1){
            message.channel.send("This device is mounted. This may destroy the disk. Continuing...");
            return message.channel.send("Disk check complete.");
        }
        return message.channel.send("Disk check complete.");
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","File Systems Check",`
        fsck---${this.description}
        
        Syntax:
        ~fsck [device]

        Arguments:
        device---The device to check

        Optional Arguments:
        None

        Requires sudo:
        True
        
        Note:
        A simple file systems check.

        `);
    }
}