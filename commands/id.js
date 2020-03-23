module.exports = {
    name:"id",
    description:"Returns the name of the current user.",
    isHidden:false,
    execute(message,args,sudo){
        const main = require("../main.js");
        return message.channel.send(`${main.getName()}`);
    }
}