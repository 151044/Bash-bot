module.exports = {
    name: 'su',
    description:'Switches user. Is deprecated and may not work.',
    isHidden:false,
    execute(message,args,sudo){
        message.channel.send("Deprecated. This *may* not work properly, which means it may not function.")
        if(args[0] === '-' || args[0] === 'root'){
            message.delete();
            if(args[1] === 'hhelibebcnofnenamgalsipsclarkca'){
                if(args[2] === '--suppress-instant-logout'){
                    message.channel.send("Logged in as user root.");
                    return message.channel.send("Log out will occur in 5 seconds.");
                }
                message.channel.send("Successfully switched to user root.");
                return message.channel.send("Logged out, returned to user bash");
            }else{
                return message.channel.send("Incorrect password.");
            }
        }else{
            return message.channel.send(`Switched user to ${args[0]}.`);
        }
    },
        fullMsg(){
            const main = require("../main.js");
            return main.embedFrom("Bash","Switch user",`
            ${this.name}---${this.description}
            
            Syntax:
            ~su [user]
    
            Arguments:
            user---The user to switch to.
    
            Optional Arguments:
            None
    
            Requires sudo:
            False
            
            Note:
            May not work properly.
    
            `);
        }
}