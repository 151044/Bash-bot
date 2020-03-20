module.exports = {
    name:"ln",
    description:"ln",
    execute(message,args,sudo){
        const num = parseInt(args);
        if(Number.isNaN(num)){
            return message.channel.send("No number detected!");
        }
        return message.channel.send(`ln(${args[0]}) = ${Math.log(num)}`)
    }
}