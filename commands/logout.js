module.exports = {
    name:"logout",
    description:"Logout",
    execute(message,args,sudo){
        const main = require("../main.js")
        message.channel.send("Logged out.");
        main.loggedIn(false);
        main.changeUser("No user.")
    }
}