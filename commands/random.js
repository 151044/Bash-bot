module.exports = {
	name: 'random',
	description: 'The random function.',
	execute(message, args,sudo) {
        const num = parseInt(args);
        if(Number.isNaN(num)){
            return message.channel.send("No number detected!");
        }
        return message.channel.send(`${Math.floor(Math.random() * num)}`);
	},
};