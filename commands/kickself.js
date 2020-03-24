module.exports = {
    name:"kickyourself",
    description:"Kicks the user who posted this message.",
    execute(message,args,sudo){
        if(message.author.id === '689828413241819136'){
            return message.channel.send("Nope, not kicking myself.");
        }
        message.member.kick("Stupidity.");
        return message.channel.send(`${message.author} just kicked themselves. What an idiot!`);
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Kick yourself",`
        kickyourself---${this.description}
        
        Syntax:
        ~kickyourself

        Arguments:
        None

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        Why would anyone want to use this?

        `);
    }
}