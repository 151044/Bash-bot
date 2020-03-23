module.exports = {
	name: 'random',
    description: 'Gets a random number from 0 to the given number.',
    isHidden:false,
	execute(message, args,sudo) {
        const num = parseInt(args);
        if(Number.isNaN(num)){
            return message.channel.send("No number detected!");
        }
        return message.channel.send(`${Math.floor(Math.random() * num)}`);
	},
};