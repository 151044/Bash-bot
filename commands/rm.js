module.exports = {
    name : 'rm',
    description:'Removes a file.',
    isHidden:false,
    execute(message,args,sudo){
        if(args.includes('/')){
            if(!sudo){
                return message.channel.send("No root, no rm. Come back later.");
            }else{
                const main = require("../main.js");
                if(!main.verifySudo(main.getName(),`${args[args.length - 1]}`,message)){
                    message.delete();
                    return;
                }
                message.delete();
                message.channel.send("/\n/\n");
                message.channel.send(`${message.content.substring(1,message.content.length - args[args.length - 1].length)}`);
                if(args.includes("-rf")){
                    if(args.includes("--no-preserve-root")){
                        message.channel.send("Removing bot....");
                        return message.channel.send("Estimated wait time: 1/0");
                    }else{
                        return message.channel.send("You missed the flag...");
                    }
                }else{
                    return message.channel.send("You are a strange one, no doubt. rm / without -rf? Really?")
                }
            }
        }else if(args.includes("/etc/fstab")){
            message.channel.send("Oh, the *much* more interesting type of person.");
            message.channel.send("To delete fstab! Hmm....");
            if(sudo){
                return message.channel.send("Really, even with root, its not happening. Go away.");
            }else{
                return message.channel.send("Well... my answer is no. You are not root!");
            }
        }else{
            return message.channel.send(`Succeessfully removed ${args[0]}`);
        }
    },
    fullMsg(){
        const main = require("../main.js");
        return main.embedFrom("Bash","Remove File",`
        ${this.name}---${this.description}
        
        Syntax:
        ~rm [file] {-rf}

        Arguments:
        file---The file to remove.

        Optional Arguments:
        -rf---Recursively force delete every file contained within, if this is a direcotry.

        Requires sudo:
        True, if removing mission critical files.
        
        Note:
        Try a few files to get the hang of it.

        `);
    }
}