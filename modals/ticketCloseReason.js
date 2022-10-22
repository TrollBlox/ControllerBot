const { EmbedBuilder, Colors } = require('discord.js');
const { transcriptsChannelId } = require('../config.json');

module.exports = {
  id: 'ticketclosereason',
  execute: async function(int) {
    const func = require('../utils/functions.js');
    const reason = int.fields.getTextInputValue('reasoninput') || 'No reason provided.';
    await func.closeTicket(int.channel.id, reason, int.user.id);

    const opener = await func.getOpener(int.channel.id);
    const user = await int.client.users.fetch(opener);
  
    const embed = new EmbedBuilder()
      .setTitle('Ticket Closed')
      .setColor(Colors.Blurple)
      .setDescription(`Your ticket ${int.channel.name} in ${int.guild.name} was closed for ${reason}!`)

    await user.createDM();
    await user.send({ embeds: [ embed ] }).catch(console.error);

    const assigneeId = await func.getAssignee(int.channel.id);

    if (assigneeId != -1 && assigneeId != null) {
      const assignee = await int.client.users.fetch(assigneeId);
      await assignee.createDM();
      await assignee.send({ embeds: [ embed.setDescription(`The ticket ${int.channel.name} in ${int.guild.name} was closed for ${reason}!`)]}).catch(console.error);
    }

    let assignee = await func.getAssignee(int.channel.id);

    if (assignee == null || assignee == -1) {
      assignee = 'N/A';
    } else {
      assignee = `<@${assignee}>`;
    }

    let assignedAt = await func.getAssignedAt(int.channel.id);

    if (assignedAt == null || assignedAt == -1) {
      assignedAt = 'N/A';
    } else {
      assignedAt = `<t:${parseInt(assignedAt / 1000)}>`;
    }

    const transcriptEmbed = new EmbedBuilder()
      .setTitle(`Ticket ${await func.getTicketNumber(int.channel.id)} Closed`)
      .setColor(Colors.Blurple)
      .setTimestamp()
      .addFields(
        { name: 'Opened By:', value: `<@${await func.getOpener(int.channel.id)}>`, inline: true },
        { name: 'Opened At:', value: `<t:${parseInt(await func.getOpenTime(int.channel.id) / 1000)}>`, inline: true },
        { name: 'Assignee:', value: `${assignee}`, inline: true },
        { name: 'Assigned At:', value: `${assignedAt}`, inline: true },
        { name: 'Closed By:', value: `<@${await func.getCloser(int.channel.id)}>`, inline: true },
        { name: 'Closed At:', value: `<t:${parseInt(await func.getCloseTime(int.channel.id) / 1000)}>`, inline: true },
        { name: 'Closed Because:', value: `${await func.getReason(int.channel.id)}`, inline: true }
      );

    const transcripts = await int.client.channels.fetch(transcriptsChannelId);
    await transcripts.send({ embeds: [ transcriptEmbed ] });
    await int.reply('Ticket Closed')
    return await int.channel.delete();
  }
}