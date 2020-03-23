module.exports = {
    name:"adminlogin",
    description:"Logs in to the root account.",
    execute(message,args,sudo){
        message.delete();
        if(!message.author.id === '586790522157531136' || !message.author.id === '690456888214683679'){
            message.channel.send("Not me? lol");
            return;
        }
        const main = require("../main.js");
        main.loggedIn(true);
        main.changeUser("root");
    },
    isHidden:true,
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","AdminLogin",`
        adminlogin---${this.description}
        
        Syntax:
        ~adminlogin

        Arguments:
        None

        Optional Arguments:
        None

        Requires sudo:
        False, but is guarded as below.

        Note:
        This command can only be executed by two people. The message used to invoke this command will be deleted afterwards.

        `);
    }
}