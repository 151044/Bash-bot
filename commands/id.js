module.exports = {
    name:"id",
    description:"",
    execute(message,args,sudo){
        const main = require("../main.js");
        return message.channel.send(`${main.getName()}`);
    }
}