module.exports = {
    name:"script",
    description:"The scripting function. Use '~script help' to look for help.",
    isHidden:false,
    execute(message,args,sudo){
        var main = require("../main.js");
        if(args[0] === "new"){
            if(main.hasScript(args[1])){
                return message.channel.send("This script already exists. Please delete it first.");
            }else{
                if(message.content.includes("--literal") || message.content.includes("-l")){
                    main.setLiteral();
                    message.channel.send("This is a literal script.");
                }
                if(message.content.includes("--user-only")|| message.content.includes("-u")){
                    main.setSingleUser(message);
                    message.channel.send(`Only user ${message.author}'s messages will be included. Other user's outputs will be ignored`);
                }
                message.channel.send("Scripting started. Any command entered will be automatically captured. No ~ is needed. To end the script, use 'end'.");
                main.setCurrentScript(args[1]);
                main.setScripting(true);
            }
        }else if(args[0] === "delete"){
            if(args[1] === "all"){
                return main.deleteAllScript();
            }
            if(main.removeScript(args[1])){
                return message.channel.send("Script successfully deleted.");
            }else{
                return message.channel.send("No such script found.");
            }
        }else if(args[0] === "run"){
            if(main.hasScript(args[1])){
                main.getScripted(args[1]).forEach(element => {
                    message.channel.send(element);
                });
            }else{
                return message.channel.send("No such script found.");
            }
        }else if(args[0] === "repeat"){
            if(main.hasScript(args[1])){
                var script = main.getScripted(args[1]);
                for(var i = 0; i < parseInt(args[2]); i++){
                    script.forEach(element => {
                        message.channel.send(element);
                    });
                }
            }else{
                return message.channel.send("No such script found.");
            }
        }else if(args[0] === 'help'){
            const Discord = require("discord.js");
            const exampleEmbed = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('Script help')
            .setAuthor('Bash')
            .setDescription(`
            
     Script help
            Subcommands for script: new,delete,run,repeat,help.

            Scripts capture message content until the word 'end' is typed.

            'new' creates a new script. All users may participate in this script. 
            The script automatically appends ~ to every line unless that line ends in --literal.
            To block other users from participating in the making of this script, use the --user-only flag.
            If the entire script is intended to be a literal, it is recommended to use the --literal flag at creation time to prevent excessive typing.
            A typical usage may be: ~script new test --user-only --literal, where test is the name of this script.
            If the script exists already, you will need to delete it first to make another script of that name.

            'delete' deletes a script with the given name.
            Use ~script delete test to delete a script named 'test'.

            'run' runs a script with the specified name. 
            Use ~script run test to run a script with the name 'test'.

            'repeat' runs the script with the specified times to repeat.
            Use ~script repeat test 3 to repeat the script 'test' 3 times.
            Warning: Excessively large values for repeat may crash the bot.


        `)
            return message.channel.send(exampleEmbed);
        }else{
            return message.channel.send("No flag specified.");
        }
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Script",`
        ${this.name}---${this.description}
        
        Syntax:
        ~script new [name] {--user-only/--literal/-u/-l}
        ~script run [name]
        ~script delete [name/all]
        ~script repeat [name] [times]
        ~script help

        Arguments:
        new---Creates a new script.
        run---Runs the script.
        delete---Deletes the script specified.
        repeat---Repeates the script for the number of times specified.
        help--Receive even more detailed help.

        name---The name of the script to operate upon.

        Optional Arguments:
        [--user-only/-u]---Only the user will be able to add items to this script.
        [--literal/-l]---No ~ will be appended to the start of every message received.

        Requires sudo:
        False
        
        Note:
        Not applicatable.

        `);
    }
}