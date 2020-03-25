module.exports = {
    name:"riddlesolver",
    description:"Tries to solve the riddle with the supplied words to guess.",
    execute(message,args,sudo){
        var sliced;
        if(args.includes("-h") || args.includes("--hide")){
            message.delete();
            sliced = args.slice(0,args.length - 1);
        }else{
            sliced = args;
        }
        for(var str of sliced){
            message.channel.send(`I guess ${str}`);
        }
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Riddle solver",`
        riddlesolver---${this.description}
        
        Syntax:
        ~riddlesolver [toGuess] {-h/--hide}

        Arguments:
        toGuess---The words to guess

        Optional Arguments:
        {-h/--hide}---Hides this command if you don't want your guesses to be leaked.

        Requires sudo:
        False
        
        Note:
        Not applicatable.

        `);
    }
}