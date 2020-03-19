module.exports = {
    name: 'su',
    description:'',
    execute(message,args,sudo){
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
    }
}