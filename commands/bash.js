module.exports = {
    name: 'bash',
    description: "Bashed.",
    execute(message,args,sudo){
        return message.channel.send("bash@bash-for-discord:~$");
    }
}