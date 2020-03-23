module.exports = {
    name: 'bash',
    description: "Bashed.",
    isHidden:true,
    execute(message,args,sudo){
        return message.channel.send("bash@bash-for-discord:~$");
    }
}