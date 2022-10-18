const { SlashCommandBuilder, EmbedBuilder, Colors, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a user')
    .addUserOption(option =>
      option.setName('user')
      .setDescription('The user to kick')
      .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
      .setDescription('The reason for the kick')
      .setRequired(false)),
    async execute(int) {
      const user = await int.options.getUser('user');
      const reason = await int.options.getString('reason') || 'No reason provided';
      const embed = new EmbedBuilder();
      embed.setColor(Colors.Blurple);

      if (!await int.member.permissions.has([ PermissionsBitField.Flags.KickMembers ])) {
        embed.setTitle('Error');
        embed.setDescription(`You cannot kick members!`);
        return await int.reply({ embeds: [embed] });
      }

      if (await int.member.roles.highest >= await int.guild.members.cache.get(user.id).roles.highest || user == int.client.user) {
        embed.setDescription(`You cannot kick <@${user.id}>!`);
        return await int.reply({ embeds: [ embed ]});
      }

      if (await int.guild.ownerId == user.id) {
        embed.setDescription('You cannot kick a server\'s owner!');
        await int.reply({ embeds: [ embed ] });
      }

      embed.setTitle('Kick');
      embed.setDescription(`You have been kicked from ${int.guild.name} for ${reason}!`);
      await user.createDM();
      await user.send({ embeds: [ embed ] } );
      const member = await int.guild.members.fetch(user);
      await member.kick(reason);
      embed.setDescription(`<@${user.id}> has been kicked for ${reason}!`);
      return await int.reply({ embeds: [embed] });

    }
};