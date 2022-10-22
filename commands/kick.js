const { SlashCommandBuilder, EmbedBuilder, Colors, PermissionFlagsBits } = require('discord.js');

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
      .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false),
    async execute(int) {
      const user = await int.options.getUser('user');
      const reason = await int.options.getString('reason') || 'No reason provided';
      const embed = new EmbedBuilder()
        .setColor(Colors.Blurple);

      if (int.user.id != int.guild.ownerId) {

        if (await int.member.roles.highest >= await int.guild.members.cache.get(user.id).roles.highest || user == int.client.user) {
          embed.setDescription(`You cannot kick ${user.toString()}!`);
          return await int.reply({ embeds: [ embed ]});
        }

        if (await int.guild.ownerId == user.id) {
          embed.setDescription('You cannot kick a server\'s owner!');
          await int.reply({ embeds: [ embed ] });
        }
      }
      
      if (!int.guild.members.fetch(user).kickable) {
        embed.setDescription(`${user.toString()} is not able to be kicked by the bot!`);
        return await int.reply({ embeds: [embed] });
      }

      embed.setTitle('Kick');
      embed.setDescription(`You have been kicked from ${int.guild.name} for ${reason}!`);
      await user.createDM();
      await user.send({ embeds: [ embed ] } );
      const member = await int.guild.members.fetch(user);
      await member.kick(reason);
      embed.setDescription(`${user.toString()} has been kicked for ${reason}!`);
      return await int.reply({ embeds: [embed] });

    }
};