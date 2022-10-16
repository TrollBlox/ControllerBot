const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, Colors } = require('discord.js');
const { rulesChannelId, rulesMessageId } = require('../config.json');

module.exports = {
  name: 'createrules',
  async execute(client) {
    const rules = new ButtonBuilder()
      .setCustomId('rules')
      .setLabel('Rules')
      .setStyle(ButtonStyle.Primary);
    const roles = new ButtonBuilder()
      .setCustomId('colors')
      .setLabel('Colors')
      .setStyle(ButtonStyle.Secondary);
    const row = new ActionRowBuilder()
      .addComponents(rules, roles);
    const embed = new EmbedBuilder()
      .setTitle('Welcome!')
      .setDescription('Things to do around here:\n\nRead the rules\n\nGet roles')
      .setColor(Colors.Blurple);
    
    
    const channel = await client.channels.cache.get(rulesChannelId);
    const message = await channel.messages.fetch(rulesMessageId);
    
    return await message.edit({ embeds: [ embed ], components: [ row ] });
  }
}