// Require the necessary discord.js classes
const { Client, Intents, Collection, Interaction } = require('discord.js');

// Create a new client instance
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})
let gremblo = "Gremblo"
// Require dotenv to read environment variables
const dotenv = require('dotenv');
const fs = require('fs');

// Initialize commands
const commands = {}
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

commandFiles.forEach(commandFile => {
    const command = require(`./commands/${commandFile}`)
    if (command.prefix && command.fn) {
        commands[command.prefix] = command.fn;
    }
})

dotenv.config();
const token = process.env.TOKEN;
const clientID = process.env.CLIENT_ID;

// When the client is ready, run this code (only once)
client.on('ready', () => {
    guilds = client.guilds.cache
    guilds.forEach(guild => {
        console.log(`Bot has logged onto: ${guild.name}`)
    })
    console.log(`Client has logged in as: ${client.user.tag}`)
    console.log('Ready!');
});

client.on('messageCreate', msg => {
    const msgContent = msg.content
    const prefix = msgContent.split(' ')[0].toLowerCase()
    const args = msgContent.split(' ')[1]
    // Prevent the bot from responding to itself / non-commands
    if (msg.author.id === clientID || commands[prefix] === undefined) {
        return
    }
    else {
        console.log(prefix)
        console.log(args)
        commands[prefix](msg, args);
    }
})

// Login to Discord with your client's token
client.login(token);