module.exports = {
    name:"search",
    description:"Searches something on the internet.",
    isHidden:true,
    execute(message,args,sudo){
        return message.channel.send(`https://duckduckgo.com/?t=ffab&q=${message.content.substring(1,message.content.length)}&ia=web`);
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Help",`
        ${this.name}---${this.description}
        
        Syntax:
        ~search [keyword]

        Arguments:
        keyword---The keyword to search

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        Not applicatable.

        `);
    }
}