const { ActionRowBuilder } = require('discord.js');
const { memberRoleId } = require('../config.json');
const { close, assign } = require('./newTicket.js');

module.exports = {
  id: 'assignself',
  execute: async function(int) {
    const func = require('../utils/functions.js');
    if (int.member.roles.highest.id == memberRoleId) {
      return await int.reply({ content: `Only a server manager can assign themselves to a ticket!`});
    }
    await func.setAssignee(int.channel.id, int.user.id);

    const row = new ActionRowBuilder()
      .addComponents(close, assign.setDisabled(true));

    await int.message.edit({ components: [ row ] });

    return await int.reply({ content: 'Successfully assigned you to this ticket!', ephemeral: true });

  }
}