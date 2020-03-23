module.exports = {
    name: "throw",
    description:"Throws something.",
    isHidden:false,
    execute(message,args,sudo){
        if(message.content.includes("Exception") || message.content.includes("Error")){
            message.channel.send(`${args[0]} thrown by command.`);
            message.channel.send(`Halting in 1 second.`);
            return message.channel.send(`Restarting...`);
        }else if(args[0] === 'dice'){
            return message.channel.send('~random 6');
        }else if(args[0] === "大舊石" || args[0] === 'rock' || args[0] === 'Shek'){
            if(Math.floor(Math.random() * 2) == 1){
                return message.channel.send("Error:Object has reached critical mass and cannot be thrown.");
            }else{
                return message.channel.send("Error:Immortal object cannot be thrown.");
            }
        }else{
            return message.channel.send(`Thrown ${args} away.`);
        }
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Throw Utility",`
        ${this.name}---${this.description}
        
        Syntax:
        ~throw [object]

        Arguments:
        object---The object to try to throw.

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        Try different objects.

        `);
    }
}