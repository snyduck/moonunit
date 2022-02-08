//says hello


module.exports = {
    prefix: "!hello",
    fn: (msg, args) =>{
        if (msg.author.id === '906739475030360094' || msg.author.id === '148627778579857408'){
            msg.reply("Hello!")
        }
        else {
            const curses = ["[EXPLETIVE DELETED]","[CENSORED]","[REDACTED]","[CAN'T SAY THAT ON A CHRISTIAN SERVER]"]
            const randomCurse = curses[Math.floor((Math.random()) *curses.length)];
            msg.reply(`Up yours, ${randomCurse}`)
            console.log(curses[2])

        }
    }
}
