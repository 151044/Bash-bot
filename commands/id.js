module.exports = {
    name:"id",
    description:"Returns the name of the current user.",
    isHidden:false,
    execute(message,args,sudo){
        const main = require("../main.js");
        return message.channel.send(`${main.getName()}`);
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","ID",`
        id---${this.description}
        
        Syntax:
        ~id

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