module.exports = {
    name:"echo",
    description:"Prints the first argument it receives, ignores otherwise.",
    isHidden:false,
    execute(message,args,sudo){
        return message.channel.send(`${args[0]}`);
    }
}