module.exports = {
    name:"xkcd",
    description:"Retrieves an xkcd from the number supplied.",
    isHidden:false,
    execute(message,args,sudo){
        const num = parseInt(args);
        if(Number.isNaN(num)){
            return message.channel.send("No number detected!");
        }
        return message.channel.send(`https://xkcd.com/${num}`)
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","xkcd",`
        xkcd---${this.description}
        
        Syntax:
        ~xkcd [number]

        Arguments:
        number---The xkcd to retrieve

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        Not applicatable.

        `);
    }
}