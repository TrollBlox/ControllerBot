const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  id: 'closeticket',
  async execute(int) {
    const func = require('../utils/functions.js');
    const modal = new ModalBuilder()
      .setCustomId('ticketclosereason')
      .setTitle('Reason');
    const textInput = new TextInputBuilder()
      .setCustomId('reasoninput')
      .setLabel('Reason for Closing Ticket')
      .setStyle(TextInputStyle.Short)
      .setRequired(false)
      .setPlaceholder('Enter reason here...');
    const row = new ActionRowBuilder().addComponents(textInput);
    modal.addComponents(row);
    return await int.showModal(modal);
  }
}