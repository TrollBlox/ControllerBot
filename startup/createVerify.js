const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, Colors } = require('discord.js');
const { verifyChannelId, verifyMessageId } = require('../config.json');

module.exports = {
  name: 'createverify',
  async execute(client) {
    const ticket = new ButtonBuilder()
      .setCustomId('createverify')
      .setLabel('Click Me to Verify!')
      .setStyle(ButtonStyle.Success);
    const row = new ActionRowBuilder()
      .addComponents(ticket);
    const embed = new EmbedBuilder()
      .setTitle('Verify')
      .setDescription('Click the button below to verify in the server :)')
      .setColor(Colors.Blurple);

    const channel = await client.channels.cache.get(verifyChannelId);
    const message = await channel.messages.fetch(verifyMessageId);
  
    return await message.edit({ embeds: [ embed ], components: [ row ] });
  }
}