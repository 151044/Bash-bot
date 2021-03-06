module.exports = {
    name:"help",
    description:"Alias to man",
    execute(message,args,sudo){
        message.channel.send("Please use ~man instead.");
        return message.channel.send(`~man -a`);
    },
    isHidden:true,
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Help",`
        ${this.name}---${this.description}
        
        Syntax:
        ~help

        Arguments:
        None

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        Not applicatable.

        `);
    }
}