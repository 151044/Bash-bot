module.exports = {
	name: 'die',
	description: 'no u',
	isHidden:true,
	execute(message, args,sudo) {
        return message.channel.send("No U");
	},
};