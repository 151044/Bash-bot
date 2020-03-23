module.exports = {
    name : "lsblk",
    description:"List block devices.",
    isHIdden:false,
    execute(message,args,sudo){
        message.channel.send('/dev/null');
        message.channel.send('/dev/urandom');
        message.channel.send('/dev/random');
        return message.channel.send('/dev/sdz1');
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","List Block Devices",`
        lsblk---${this.description}
        
        Syntax:
        ~lsblk

        Arguments:
        None

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        List all disk devices.

        `);
    }
}