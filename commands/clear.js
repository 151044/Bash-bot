module.exports = {
	name: 'clear',
	description: 'The clear function.',
	execute(message, args,sudo) {
        const cNum = parseInt(args[0]);
        if(Number.isNaN(cNum)){
            return message.channel.send("Please enter a number.")
        }
        message.delete(1);
        return message.channel.fetchMessages({ limit: cNum }).then(mess =>{
            mess.forEach(mes => mes.delete(1));
        });
	},
};