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
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Random",`
        random---${this.description}
        
        Syntax:
        ~random [number]

        Arguments:
        number---The upper bound for random generation.

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        Not applicatable.

        `);
    }
};