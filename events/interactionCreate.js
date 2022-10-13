module.exports = {
  name: 'interactionCreate',
  async execute(int) {
    if (!int.isCommand()) return;
    if (int.user == int.client.user) return;

    const command = int.client.commands.get(int.commandName);

    try {
      await command.execute(int, int.client);
    } catch (error) {
	  	console.error(error);
	  	await int.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	  }
  },
};