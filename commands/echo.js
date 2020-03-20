module.exports = {
    name:"echo",
    description:"hi",
    execute(message,args,sudo){
        return message.channel.send(`${args[0]}`);
    }
}