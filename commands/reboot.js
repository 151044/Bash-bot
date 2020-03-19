module.exports = {
    name: "reboot",
    description: "",
    execute(message,args,sudo){
        this.execute('node .',function(err,data){
            console.log(err);
            console.log(data.toString());
        });
        process.kill(0);
        return;
    }
}