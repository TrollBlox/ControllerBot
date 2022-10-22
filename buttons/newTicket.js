const { PermissionsBitField, EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { memberRoleId } = require('../config.json');

module.exports = {
  id: 'createTicket',
  close: new ButtonBuilder()
    .setCustomId('closeticket')
    .setLabel('Close')
    .setStyle(ButtonStyle.Danger),
  assign: new ButtonBuilder()
    .setCustomId('assignself')
    .setLabel('Assign Yourself')
    .setStyle(ButtonStyle.Primary),
  async execute(int) {
    const func = require('../utils/functions');
    const embed2 = new EmbedBuilder();
    if (await func.userHasTicket(int.user.id) !== null) {
      embed2.setDescription('You already have a ticket!');
      return await int.reply({ embeds: [ embed2 ], ephemeral: true });
    }
    const embed = new EmbedBuilder() 
      .setTitle('Support Ticket')
      .setDescription('This is the support ticket!')
      .setColor(Colors.Blurple);
    const channel = await int.guild.channels.create({ 
      name: `ticket-${await func.getTicketCount(int.guild.id) + 1}`, 
      permissionOverwrites:
        [
          {
            id: memberRoleId,
            deny: PermissionsBitField.Flags.ViewChannel,
          },
          {
            id: int.user.id,
            allow: PermissionsBitField.Flags.ViewChannel
          }
        ],
      reason: 'new ticket'
    });

    const row = new ActionRowBuilder()
      .addComponents(this.close, this.assign);

    await func.newTicket(int, channel.id);

    await channel.send({ embeds: [ embed ], components: [ row ] });

    embed2.setDescription(`Your ticket has been made. Proceed to <#${channel.id}> to get support!`)
      .setColor(Colors.Blurple);

    return await int.reply({ embeds: [ embed2 ], ephemeral: true });
    
  }
}