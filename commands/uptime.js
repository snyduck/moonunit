module.exports = {
    prefix: "!uptime",
    fn: (msg,args) => {
        msg.reply(`The bot has been up for ${Math.floor(process.uptime() / 60)} minutes`)
    }
}