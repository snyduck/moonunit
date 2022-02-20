// Require the necessary discord.js classes
const { Client, Intents, Collection, Interaction } = require('discord.js');

// Require dotenv to read environment variables
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();
const token = process.env.TOKEN;
const testToken = process.env.TEST_TOKEN;
const clientID = process.env.CLIENT_ID;
const mySQLHost = process.env.MYSQL_HOST;
const mySQLUser = process.env.MYSQL_USER;
const mySQLPWD = process.env.MYSQL_PWD;

// DB stuff
var mysql = require('mysql');

// Create DB connection
var con = mysql.createConnection({
    host: mySQLHost,
    user: mySQLUser,
    password: mySQLPWD
});

con.connect()

// Create a new client instance
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

// Initialize commands
const commands = {}
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

commandFiles.forEach(commandFile => {
    const command = require(`./commands/${commandFile}`)
    if (command.prefix && command.fn) {
        commands[command.prefix] = command.fn;
    }
})


// When the client is ready, run this code (only once)
client.on('ready', () => {
    guilds = client.guilds.cache
    guilds.forEach(guild => {
        console.log(`Bot has logged onto: ${guild.name}`)
    })
    console.log(`Client has logged in as: ${client.user.tag}`)
    commandFiles.forEach( c => (
        console.log(`Loading module ${c}`)
    ))
    console.log('Ready!');
});

client.on('messageCreate', msg => {
    const msgContent = msg.content
    const prefix = msgContent.split(' ')[0].toLowerCase()
    const args = msgContent.split(' ')[1]
    const authorID = msg["author"]["id"]
    // Prevent the bot from responding to itself / non-commands
    if (msg.author.id === clientID || commands[prefix] === undefined) {
        return
    }
    else {
        console.log(prefix)
        console.log(args)

        if (prefix.startsWith("?!")) {
            con.query(`SELECT * FROM moonunit.admins WHERE userid = ${authorID};`, function (err, results) {
                if (err) throw err;
                if (results.length === 0) {
                    console.log("You do not have permission")
                }
                else {
                    commands[prefix](msg, args, con);
                }
            })
        }
        else {
            commands[prefix](msg, args, con);
        }
    }
})

// Login to Discord with your client's token
client.login(testToken);