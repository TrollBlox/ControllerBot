const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, Colors } = require('discord.js');
const { ticketsChannel } = require('../config.json');

module.exports = {
  name: 'createticket',
  async execute(client) {
    const ticket = new ButtonBuilder()
      .setCustomId('createTicket')
      .setLabel('New Ticket')
      .setStyle(ButtonStyle.Success);
    const row = new ActionRowBuilder()
      .addComponents(ticket);
    const embed = new EmbedBuilder()
      .setTitle('Tickets')
      .setDescription('Do you have a question? Need some help? Create a ticket below :)')
      .setColor(Colors.Blurple);

    const channel = await client.channels.fetch(ticketsChannel);

    await channel.messages.fetch({ limit: 100 }).then(messages => {
      messages.forEach(async message => await message.delete());
    });
    
    channel.send({ embeds: [ embed ], components: [ row ] });
  }
}