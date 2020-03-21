module.exports = {
    name:"script",
    description:"",
    execute(message,args,sudo){
        var main = require("../main.js");
        if(args[0] === "new"){
            if(main.hasScript(args[1])){
                return message.channel.send("This script already exists. Please delete it first.");
            }else{
                if(message.content.includes("--literal")){
                    main.setLiteral();
                    message.channel.send("This is a literal script.");
                }
                if(message.content.includes("--user-only")){
                    main.setSingleUser(message);
                    message.channel.send(`Only user ${message.author}'s messages will be included. Other user's outputs will be ignored`);
                }
                message.channel.send("Scripting started. Any command entered will be automatically captured. No ~ is needed. To end the script, use 'end'.");
                main.setCurrentScript(args[1]);
                main.setScripting(true);
            }
        }else if(args[0] === "delete"){
            if(args[1] === "all"){
                return main.deleteAllScript();
            }
            if(main.removeScript(args[1])){
                return message.channel.send("Script successfully deleted.");
            }else{
                return message.channel.send("No such script found.");
            }
        }else if(args[0] === "run"){
            if(main.hasScript(args[1])){
                main.getScripted(args[1]).forEach(element => {
                    message.channel.send(element);
                });
            }else{
                return message.channel.send("No such script found.");
            }
        }else if(args[0] === "repeat"){
            if(main.hasScript(args[1])){
                var script = main.getScripted(args[1]);
                for(var i = 0; i < parseInt(args[2]); i++){
                    script.forEach(element => {
                        message.channel.send(element);
                    });
                }
            }else{
                return message.channel.send("No such script found.");
            }
        }else{
            return message.channel.send("No flag specified.");
        }
    }
}