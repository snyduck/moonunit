// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
// Require dotenv to read environment variables
const dotenv = require('dotenv');
dotenv.config();
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

// Create a new client instance
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

// When the client is ready, run this code (only once)
client.on('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', msg => {
    // Prevent the bot from responding to itself
    if (msg.author.id === process.env.CLIENT_ID || !msg.content.startsWith(prefix)){
        return
    }
    else {
        msg.channel.send("Hey")
    }
})

// Login to Discord with your client's token
client.login(token);
