module.exports = {
	name: 'die',
	description: 'no u',
	isHidden:true,
	execute(message, args,sudo) {
        return message.channel.send("No U");
	},
	fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Die",`
        die---${this.description}
        
        Syntax:
        ~die

        Arguments:
        None

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        Let this one surprise you.

        `);
    }
};