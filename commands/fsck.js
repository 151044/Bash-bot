module.exports = {
    name : "fsck",
    description:"Checks file system",
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
        message.channel.send("/\n/\n");
        message.channel.send(`${message.content.substring(1,message.content.length - args[args.length - 1].length)}`);
        message.channel.send(`Checking ${args[0]}`);
        if(Math.floor(Math.random() * 1)){
            message.channel.send("This device is mounted. This may destroy the disk. Continuing...");
            return message.channel.send("Disk check complete.");
        }
        return message.channel.send("Disk check complete.");
    }
}