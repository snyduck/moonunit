module.exports = {
    prefix: "!getmycar",
    fn: (msg, args, con) => {
        con.query(`SELECT * FROM moonunit.players RIGHT JOIN moonunit.cpvehicles ON moonunit.players.userid = moonunit.cpvehicles.ownerID WHERE userid = '${msg.author.id}';`, (err, results) => {
            if (err) {
                throw err
            } else {
                if (results[0] === undefined) {
                    msg.reply("No vehicles detected in your inventory.")
                    console.log(`No vehicles detected for user ${msg.author.id} with name ${msg.author.username}`)
                }
                else {
                    if (results.length > 1){
                        results.forEach((car) => {
                            msg.reply(`**Car name**: ${car.vehiclename}\n**Car description**: ${car.description}\n**Car SDP**: ${car.sdp}\n**Current upgrades**: ${car.upgrades}`)
                        })
                    }
                    else{
                        const car = results[0];
                        msg.reply(`**Car name**: ${car.vehiclename}\n**Car description**: ${car.description}\n**Car SDP**: ${car.sdp}\n**Current upgrades**: ${car.upgrades}`)
                        }
                }
            }
        })
    }
}

//   