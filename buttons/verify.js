const { EmbedBuilder, Colors } = require('discord.js');
const { logsChannel, memberRoleId } = require('../config.json');

module.exports = {
  id: 'createverify',
  async execute(int) {
    const embed = new EmbedBuilder()
      .setTitle('New Verified')
      .setDescription(`<@${int.user.id}> just verified!`)
      .setColor(Colors.Blurple);

    const role = await int.guild.roles.fetch(memberRoleId);
    const member = int.member;
    await member.roles.add(role, 'verified');
    
    const channel = int.client.channels.cache.get(logsChannel);

    await channel.send({ embeds: [ embed ], ephemeral: true });

    return await int.reply({ content: 'Verified Successfully!', ephemeral: true });

  }
}