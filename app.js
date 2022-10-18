const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require('node:fs');
const config = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.buttons = new Collection();
client.events = new Collection();
client.modals = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const buttonFiles = fs.readdirSync('./buttons').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const modalFiles = fs.readdirSync('./modals').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

for (const file of buttonFiles) {
	const button = require(`./buttons/${file}`);
	client.buttons.set(button.id, button);
}

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.events.set(event.name, event);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

for (const file of modalFiles) {
	const modal = require(`./modals/${file}`);
	client.modals.set(modal.id, modal);
}

client.login(config.token);

module.exports = { client }
