module.exports = {
    name:"login",
    description:"Logs in with the specified username and password.",
    isHidden:false,
    execute(message,args,sudo){
        const main = require('../main.js');
        var fs = require("fs");
        message.delete();
        var users = JSON.parse(fs.readFileSync("./commands/users.json",'utf8',function(err,data){
            throw err;
        }));
        if(!users.userList.includes(args[0])){
            return message.channel.send("No such user.");
        }
        var pwFile = JSON.parse(fs.readFileSync("./commands/passwd.json",'utf8',function(err,data){
            throw err;
        }));
        if(new Map(Object.entries(pwFile)).get(args[0]) === args[1]){
            message.channel.send(`Logged in as ${args[0]}`);
            main.loggedIn(true);
            main.changeUser(args[0]);
            message.delete();
            message.channel.send("/\n/\n");
            message.channel.send(`${message.content.substring(1,message.content.length - args[args.length - 1].length)}`);
        }else{
            message.delete();
            return message.channel.send("Incorrect password!");
        }
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Login",`
        login---${this.description}
        
        Syntax:
        ~login [user] [password]

        Arguments:
        user---The user to try to login
        password--The password of the user you are trying to log into

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        Works even when not logged in.

        `);
    }
}