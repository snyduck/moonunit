module.exports = {
    prefix: "!ping",
    fn: (msg, args) => {
        if (args){
            msg.channel.send(`PONG, Mr. ${msg.author} ${args}`)
        }
        else {
            msg.channel.send(`Feeling a little lonely, eh ${msg.author}`)
        }
    }
}