module.exports = {
    prefix: "?!test",
    fn: (msg, args, con) => {
        con.query(`SELECT * FROM moonunit.players`, (err, results) => {
            if (err) throw err;
            let list = results
            players = []
            list.forEach( p => (players.push(p["displayname"])))
            msg.reply("The players are:")
            players.forEach( p=>(msg.reply(p)))
        })
    }
}