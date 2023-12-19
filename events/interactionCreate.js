const { skips } = require('../config.json');

module.exports = {
  name: 'interactionCreate',
  async execute(int) {
    if (int.user == int.client.user) return;
    if (skips.includes(int.customId)) {
      await int.reply({ content: "hi", ephemeral: true});
      return await int.deleteReply();
    }
    if (int.isButton()) {
      const button = int.client.buttons.get(int.customId);
      // console.log(int.client.buttons)
      try {
        return await button.execute(int);
      } catch (error) {
        console.error(error);
        return await int.reply({ content: 'There was an error while executing this button!', ephemeral: true });
      }
    }

    if (int.isModalSubmit()) {
      const modal = int.client.modals.get(int.customId);

      try {
        return await modal.execute(int);
      } catch (error) {
        console.error(error);
        return await int.reply({ content: 'There was an error while executing this modal!', ephemeral: true });
      }
    }

    if (int.isCommand()) {
      const command = int.client.commands.get(int.commandName);

      try {
        return await command.execute(int);
      } catch (error) {
        console.error(error);
        return await int.channel.send({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  },
};