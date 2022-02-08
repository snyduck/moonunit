module.exports = {
    prefix: '!exp',
    fn: (msg, args) => {
        if (args === "last") {
            msg.reply("The RADIUM EYES players earned <60> IP last session!")
        }
        else {
            msg.reply("The RADIUM EYES players have earned <490> IP so far!")
        }
    }
}