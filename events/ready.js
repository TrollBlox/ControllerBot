module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
    console.log(`${new Date(Date.now())}: <console> - Logging in as ${client.user.tag}...`);
    console.log(`${new Date(Date.now())}: <console> - Logged in as ${client.user.tag}.`);
	},
};