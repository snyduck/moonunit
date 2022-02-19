module.exports = {
    prefix: "!getlastip",
    fn: (msg, args, con) => {
        con.query(`SELECT * FROM moonunit.cpIPLog`, (err, results) => {
            console.log(results)
            const lastGame = results.slice(-1)[0]
            msg.reply(`The party earned ${lastGame["ipEarned"]} IP on ${lastGame["date"]}`)
        })
        
    }
}