module.exports = {
    name:"nocmd",
    description:"Placeholder command",
    isHidden:true,
    execute(message,args,sudo){
        return;
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Placeholder Command",`
        nocmd---${this.description}
        
        Syntax:
        ~nocmd

        Arguments:
        None

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        Should not be found. How did you see this page?

        `);
    }
}