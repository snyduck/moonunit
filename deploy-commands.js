const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');
dotenv.config();
const clientID = process.env.CLIENT_ID;
const guildID = process.env.SERVER_ID;
const token = process.env.TOKEN;

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
    new SlashCommandBuilder().setName('echo').setDescription('Replies with your input!').addStringOption(option => {
        option.setName('input').setDescription('The input to echo back').setRequired(true)
    })
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
