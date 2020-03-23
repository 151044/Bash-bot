module.exports = {
    name : 'rr',
    description:`Rick-rolles people, with an additional 'hide' flag which hides the user who send such a disgusting message.`,
    isHidden:true,
    execute(message,args,sudo){
        message.channel.send("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        if(args[0] === 'hide'){
            message.delete();
        }
    }
}