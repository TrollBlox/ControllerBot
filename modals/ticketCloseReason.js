const { EmbedBuilder, Colors } = require('discord.js');

module.exports = {
  id: 'ticketclosereason',
  execute: async function(int) {
    const func = require('../utils/functions.js');
    const reason = int.fields.getTextInputValue('reasoninput') || 'No reason provided.';
    await func.closeTicket(int.channel.id, reason);

    const opener = await func.getOpener(int.channel.id);
    const user = await int.client.users.fetch(opener);

    const embed = new EmbedBuilder()
      .setTitle('Ticket Closed')
      .setColor(Colors.Blurple)
      .setDescription(`Your ticket ${int.channel.name} in ${int.guild.name} was closed for ${reason}!`)

    await user.createDM();
    await user.send({ embeds: [ embed ] });

    const assigneeId = await func.getAssignee(int.channel.id);
    if (assigneeId != -1) {
      const assignee = await int.client.users.fetch(assigneeId);
      await assignee.createDM();
      await assignee.send({ embeds: [ embed.setDescription(`The ticket ${int.channel.name} in ${int.guild.name} was closed for ${reason}!`)]});
    }
    await int.reply('Done.')
    return await int.channel.delete();
  }
}