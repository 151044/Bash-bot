module.exports = {
    name:"adminlogin",
    description:"",
    execute(message,args,sudo){
        message.delete();
        if(!message.author.id === '586790522157531136'){
            message.channel.send("Not me? lol");
            return;
        }
        const main = require("../main.js");
        main.loggedIn(true);
        main.changeUser("root");
    }
}