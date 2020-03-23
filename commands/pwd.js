module.exports = {
	name: 'pwd',
	description: 'Prints the working directory.',
	isHidden:true,
	execute(message, args,sudo) {
        return message.channel.send("/mnt/var/opt/bin/dpkg");
	},
};