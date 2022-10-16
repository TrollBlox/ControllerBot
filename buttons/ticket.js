const { EmbedBuilder, Colors } = require('discord.js');

module.exports = {
  id: 'createTicket',
  async execute(int) {
    const embed = new EmbedBuilder()
      .setTitle('New Ticket')
      .setDescription('Placeholder for create ticket command')
      .setColor(Colors.Blurple);

    return await int.reply({ embeds: [ embed ], ephemeral: true });

  }
}