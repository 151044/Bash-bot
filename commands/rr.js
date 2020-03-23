module.exports = {
    name : 'rr',
    description:`Rick-rolles people, with an additional 'hide' flag which hides the user who send such a disgusting message.`,
    isHidden:true,
    execute(message,args,sudo){
        message.channel.send("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        if(args[0] === 'hide'){
            message.delete();
        }
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Rick Roll",`
        ${this.name}---${this.description}
        
        Syntax:
        ~rr {hide}

        Arguments:
        None

        Optional Arguments:
        hide---Whether to delete this message.

        Requires sudo:
        False
        
        Note:
        Have fun!

        `);
    }
}