const { ActionRowBuilder, EmbedBuilder, Colors } = require('discord.js');
const { memberRoleId } = require('../config.json');
const { close, assign } = require('./newTicket.js');

module.exports = {
  id: 'assignself',
  execute: async function(int) {
    const func = require('../utils/functions.js');
    const embed = new EmbedBuilder();
    if (int.member.roles.highest.id == memberRoleId) {
      embed.setDescription('Only a server manager can assign themselves to a ticket!')
      return await int.reply({ embeds: [ embed ], ephemeral: true });
    }
    await func.setAssignee(int.channel.id, int.user.id);

    const row = new ActionRowBuilder()
      .addComponents(close, assign.setDisabled(true));

    await int.message.edit({ components: [ row ] });

    embed.setDescription(`${int.user.toString()} assigned themselves to this ticket!`)
      .setColor(Colors.Blurple);

    return await int.reply({ embeds: [ embed ] });

  }
}