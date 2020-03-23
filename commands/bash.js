module.exports = {
    name: 'bash',
    description: "Bashed.",
    isHidden:true,
    execute(message,args,sudo){
        return message.channel.send("bash@bash-for-discord:~$");
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","bash",`
        bash---${this.description}
        
        Syntax:
        ~bash

        Arguments:
        None

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        Not Applicatable.

        `);
    }
}