module.exports = {
    name:"echo",
    description:"Prints the first argument it receives, ignores otherwise.",
    isHidden:false,
    execute(message,args,sudo){
        return message.channel.send(`${args[0]}`);
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Echo",`
        echo---${this.description}
        
        Syntax:
        ~echo [toOut]

        Arguments:
        toOut--The argument to print.

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        Not applicatable.

        `);
    }
}