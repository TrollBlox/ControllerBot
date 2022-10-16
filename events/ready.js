const fs = require('node:fs');
const path = require('path');


module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
    console.log(`${new Date(Date.now())}: <console> - Logging in as ${client.user.tag}...`);
		const dirPath = path.resolve(__dirname, '../startup');
		const startupFiles = fs.readdirSync(dirPath).filter(file => file.endsWith('.js'));
		for (const file of startupFiles) {
			const startup = require(`../startup/${file}`);
			startup.execute(client);
		}
    console.log(`${new Date(Date.now())}: <console> - Logged in as ${client.user.tag}.`);
	},
};