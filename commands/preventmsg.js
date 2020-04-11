module.exports = {
    name:"preventmsg",
    description:"Prevents any further messages from being sent.",
    execute(message,args,sudo){
        const main = require("../main.js");
        if(!args.length){
            return message.channel.send("Needs arguments!");
        }
        if(args[0] === 'on'){
            main.setDeleteChannel(message.channel.id,true);
            message.channel.send("Delete mode on!");
        }
        if(args[0] === 'off'){
            main.setDeleteChannel(message.channel.id,false);
            message.channel.send("Delete mode off.");
        }
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Prevent Messages",`
        ${this.name}---${this.description}
        
        Syntax:
        ~preventmsg [on/off]

        Arguments:
        on/off--- whether to delete on all channels.

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        Not applicatable.

        `);
    }
}