module.exports = {
    name : "lsblk",
    description:"List block devices.",
    isHIdden:false,
    execute(message,args,sudo){
        message.channel.send('/dev/null');
        message.channel.send('/dev/urandom');
        message.channel.send('/dev/random');
        return message.channel.send('/dev/sdz1');
    }
}