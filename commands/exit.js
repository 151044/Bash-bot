module.exports = {
    name:"exit",
    description:"",
    execute(message,args,sudo){
        return message.channel.send(`Not interactive shell.Please use logout.`);
    }
}