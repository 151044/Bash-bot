module.exports = {
	name: 'clear',
    description: 'Clears chat messages.',
    isHidden:false,
	execute(message, args,sudo) {
        const cNum = parseInt(args[0]);
        if(Number.isNaN(cNum)){
            return message.channel.send("Please enter a number.")
        }
        return message.channel.bulkDelete(cNum + 1);
	},
};