module.exports = {
	name: 'pwd',
	description: 'Prints the working directory.',
	isHidden:true,
	execute(message, args,sudo) {
        return message.channel.send("/mnt/var/opt/bin/dpkg");
	},
	fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Print Working Directory",`
        ${this.name}---${this.description}
        
        Syntax:
        ~pwd

        Arguments:
        None

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        Paths are very interesting.

        `);
    }
};