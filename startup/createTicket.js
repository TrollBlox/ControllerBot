const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, Colors } = require('discord.js');
const { ticketsChannelId, ticketsMessageId } = require('../config.json');

module.exports = {
  name: 'createticket',
  async execute(client) {
    const ticket = new ButtonBuilder()
      .setCustomId('createTicket')
      .setLabel('New Ticket')
      .setStyle(ButtonStyle.Success)
      .setEmoji('1033233510342852629');
    const row = new ActionRowBuilder()
      .addComponents(ticket);
    const embed = new EmbedBuilder()
      .setTitle('Tickets')
      .setDescription('Do you have a question? Need some help? Create a ticket below :)')
      .setColor(Colors.Blurple);

    const channel = await client.channels.cache.get(ticketsChannelId);
    const message = await channel.messages.fetch(ticketsMessageId);
  
    return await message.edit({ embeds: [ embed ], components: [ row ] });
  }
}