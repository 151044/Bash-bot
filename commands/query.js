module.exports = {
    name:"query",
    description:"Queries stored information.",
    execute(message,args,sudo){
        if(args[0] === 'riddleWins'){
            var user = message.mentions.members.first();
            const main = require("../main.js");
            message.channel.send(`Wins for ${user}---${main.queryWins(user)}.`);
        }
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Query",`
        ${this.name}---${this.description}
        
        Syntax:
        ~query [attribute]

        Arguments:
        attribute---The attribute to query. Can be one of the following:[riddleWins]

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        Not applicatable.

        `);
    }
}