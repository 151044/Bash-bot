module.exports = {
    name:"exit",
    description:"Exits an interactive shell.",
    isHidden:true,
    execute(message,args,sudo){
        return message.channel.send(`Not interactive shell.Please use logout.`);
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Exit",`
        exit---${this.description}
        
        Syntax:
        ~exit

        Arguments:
        None

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        As always,let this one surprise you.

        `);
    }
}