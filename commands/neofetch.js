module.exports = {
    name : 'neofetch',
    description:'',
    execute(message,args,sudo){
        message.channel.send("discord@bot-for-discord");
        message.channel.send("OS: Elementary-Arch 39.8 Zorin Mint-Edition");
        message.channel.send("Kernel: 5.0.0-32-Torvalds");
        message.channel.send("Uptime: 88 years 10 days");
        message.channel.send("Packages: n, an arbitary constant");
        message.channel.send("Shell: Bash 4.4.20-you");
        message.channel.send("Resolution: 0x00");
        message.channel.send("DE: KDE Cinnamon");
        message.channel.send("WM: i386");
        message.channel.send("WM Theme: x86-32-ARM");
        message.channel.send("Theme: Linux");
        message.channel.send("Icons: CLI");
        message.channel.send("Terminal: sudo rm -rf / --no-preserve-root");
        message.channel.send("CPU: Intel i11-7980HK (32) @ 9.80 GHz");
        message.channel.send("GPU: Nvidia-Iris GeForce Radeon 4000");
        return message.channel.send("Memory: -2,147,483,647 / 204800 KiB")
    }
}