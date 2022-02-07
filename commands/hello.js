//says hello
module.exports = {
    prefix: "!hello",
    fn: (msg, args) =>{
        msg.channel.send("Hello!")
    }
}
