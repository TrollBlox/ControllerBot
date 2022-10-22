const { SlashCommandBuilder, EmbedBuilder, Colors, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a user')
    .addUserOption(option =>
      option.setName('user')
      .setDescription('The user to ban')
      .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
      .setDescription('The reason for the ban')
      .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),
    async execute(int) {
      const user = await int.options.getUser('user');
      const reason = await int.options.getString('reason') || 'No reason provided';
      const embed = new EmbedBuilder()
        .setColor(Colors.Blurple);

      if (int.user.id != int.guild.ownerId) {

        if (await int.member.roles.highest >= await int.guild.members.cache.get(user.id).roles.highest || user == int.client.user) {
          embed.setDescription(`You cannot ban${user.toString()}!`);
          return await int.reply({ embeds: [embed] });
        }

        if (await int.guild.ownerId == user.id) {
          embed.setDescription('You cannot ban a server\'s owner!');
          await int.reply({ embeds: [ embed ] });
        }
      }
      
      if (!int.guild.members.fetch(user).bannable) {
        embed.setDescription(`${user.toString()} is not able to be banned by the bot!`);
        return await int.reply({ embeds: [embed] });
      }

      embed.setTitle('Ban');
      embed.setDescription(`You have been banned from ${int.guild.name} for ${reason}!`);
      await user.createDM();
      await user.send({ embeds: [ embed ] } );
      await int.guild.members.fetch(user).ban({ reason: reason });
      embed.setDescription(`${user.toString()} has been banned for ${reason}!`);
      return await int.reply({ embeds: [embed] });

    }
};