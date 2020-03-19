module.exports = {
    name : 'rr',
    description:'',
    execute(message,args,sudo){
        message.channel.send("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        if(args[0] === 'hide'){
            message.delete();
        }
    }
}