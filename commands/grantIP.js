module.exports = {
    prefix: "?!grantip",
    fn: (msg,args,con) => {
        date = String(new Date().toLocaleDateString())
        con.query(`INSERT INTO moonunit.cpIPLog (date,campaignid,ipEarned) VALUES ('${date.toString()}',${parseInt(1)},${parseInt(args)})`, (err, results) =>  {
            if (err) throw err;
            msg.reply(`The party has been granted ${args} IP on ${date}!`)
        })
    }
}