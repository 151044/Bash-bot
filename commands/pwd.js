module.exports = {
	name: 'pwd',
	description: 'no u',
	execute(message, args,sudo) {
        return message.channel.send("/mnt/var/opt/bin/dpkg");
	},
};