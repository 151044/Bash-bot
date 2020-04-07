module.exports = {
    name:"user",
    description:"Alias to id",
    isHidden:true,
    execute(message,args,sudo){
        message.channel.send("Please use ~id.");
        return message.channel.send("~id");
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","User ",`
        ${this.name}---${this.description}
        
        Syntax:
        ~user

        Arguments:
        None\

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        Not applicatable.

        `);
    }
}