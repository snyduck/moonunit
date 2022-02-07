// Require the necessary discord.js classes
const { Client, Intents, Collection, Interaction } = require('discord.js');

// Create a new client instance
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

// Require dotenv to read environment variables
const dotenv = require('dotenv');
const fs = require('fs');

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
const prefix = process.env.PREFIX;
const clientID = process.env.CLIENT_ID;

// When the client is ready, run this code (only once)
client.on('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', msg => {
    // Prevent the bot from responding to itself
    const prefix = msg.content.split(' ')[0]
    const args = msg.content.split(' ')[1]
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
