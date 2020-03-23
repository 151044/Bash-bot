module.exports = {
    name:"exit",
    description:"Exits an interactive shell.",
    isHidden:true,
    execute(message,args,sudo){
        return message.channel.send(`Not interactive shell.Please use logout.`);
    }
}