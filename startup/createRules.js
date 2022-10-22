const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, Colors } = require('discord.js');
const { rulesChannelId, rulesMessageId } = require('../config.json');

module.exports = {
  name: 'createrules',
  async execute(client) {
    const rules = new ButtonBuilder()
      .setCustomId('rules')
      .setLabel('Rules')
      .setStyle(ButtonStyle.Success)
      .setEmoji('1007191139696255017');
    const roles = new ButtonBuilder()
      .setCustomId('colors')
      .setLabel('Colors')
      .setStyle(ButtonStyle.Primary);
    const gender = new ButtonBuilder()
      .setCustomId('gender')
      .setLabel('Gender')
      .setStyle(ButtonStyle.Primary);
    const row = new ActionRowBuilder()
      .addComponents(rules, roles, gender);
    const embed = new EmbedBuilder()
      .setTitle('Welcome!')
      .setDescription('Things to do around here:\n\nRead the rules\n\nGet roles')
      .setColor(Colors.Blurple);
    
    
    const channel = await client.channels.cache.get(rulesChannelId);
    const message = await channel.messages.fetch(rulesMessageId);
    
    return await message.edit({ embeds: [ embed ], components: [ row ] });
  }
}