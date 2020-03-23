module.exports = {
    name:"ln",
    description:"Returns the value of ln(x).",
    isHIdden:true,
    execute(message,args,sudo){
        const num = parseInt(args);
        if(Number.isNaN(num)){
            return message.channel.send("No number detected!");
        }
        return message.channel.send(`ln(${args[0]}) = ${Math.log(num)}`)
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Natural Logarithm",`
        ln---${this.description}
        
        Syntax:
        ~ln [number]

        Arguments:
        number---The number to compute the value of ln(x) 

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        Mathematical utility.

        `);
    }
}