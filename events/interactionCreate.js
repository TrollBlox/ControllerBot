module.exports = {
  name: 'interactionCreate',
  async execute(int) {
    if (int.user == int.client.user) return;
    if (int.isButton()) {
      if (int.customId == 'gold' || int.customId == 'green' || int.customId == 'blue' || int.customId == 'purple' || int.customId == 'pink' || int.customId == 'remove') {
        const colors = require('../buttons/colors.js');
        switch (int.customId) {
          case 'gold':
            colors.gold(int);
            break;
          case 'green':
            colors.green(int);
            break;
          case 'blue':
            colors.blue(int);
            break;
          case 'purple':
            colors.purple(int);
            break;
          case 'pink':
            colors.pink(int);
            break;
          case 'remove':
            colors.remove(int);
            break;
        }
        return;
      }
      const button = int.client.buttons.get(int.customId);

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