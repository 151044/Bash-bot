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
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Clear",`
        clear---${this.description}
        
        Syntax:
        ~clear [number]

        Arguments:
        number--The numbe of messages to delete.

        Optional Arguments:
        None

        Requires sudo:
        False
        
        Note:
        Please enter a number as the second argument.

        `);
    }
};