const { EmbedBuilder, Colors } = require('discord.js');

module.exports = {
  id: 'rules',
  async execute(int) {
    const embed = new EmbedBuilder()
      .setTitle('Rules')
      .setDescription('Rules go here, this for testing')
      .setColor(Colors.Blurple);

    return await int.reply({ embeds: [ embed ], ephemeral: true });
  }
}