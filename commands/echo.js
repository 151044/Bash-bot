module.exports = {
    name:"echo",
    description:"Prints the other arguments it receives.",
    isHidden:false,
    execute(message,args,sudo){
        return message.channel.send(`${args.join(' ')}`);
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Echo",`
        echo---${this.description}
        
        Syntax:
        ~echo [toOut...]

        Arguments:
        toOut--The argument(s) to print.

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        Not applicatable.

        `);
    }
}