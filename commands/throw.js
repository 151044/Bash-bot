module.exports = {
    name: "throw",
    description:"Throws something?",
    execute(message,args,sudo){
        if(message.content.includes("Exception") || message.content.includes("Error")){
            message.channel.send(`${args[0]} thrown by command.`);
            message.channel.send(`Halting in 1 second.`);
            return message.channel.send(`Restarting...`);
        }else if(args[0] === 'dice'){
            return message.channel.send('~random 6');
        }else if(args[0] === "大舊石" || args[0] === 'rock' || args[0] === 'Shek'){
            if(Math.floor(Math.random() * 2) == 1){
                return message.channel.send("Error:Object has reached critical mass and cannot be thrown.");
            }else{
                return message.channel.send("Error:Immortal object cannot be thrown.");
            }
        }else{
            return message.channel.send(`Thrown ${args} away.`);
        }
    }
}