const { SlashCommandBuilder, EmbedBuilder, Colors, PermissionsBitField, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Timeouts a user')
    .addUserOption(option =>
      option.setName('user')
      .setDescription('The user to timeout')
      .setRequired(true))
    .addIntegerOption(option =>
      option.setName('length')
      .setDescription('Minutes to timeout a user')
      .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
      .setDescription('The reason for the timeout')
      .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false),
    async execute(int) {
      const user = await int.options.getUser('user');
      const time = await int.options.getInteger('length');
      const reason = await int.options.getString('reason') || 'No reason provided';
      const embed = new EmbedBuilder()
        .setColor(Colors.Blurple);

      if (int.user.id != int.guild.ownerId) {

        if (await int.member.roles.highest >= await int.guild.members.cache.get(user.id).roles.highest || user == int.client.user) {
          embed.setDescription(`You cannot timeout ${user.toString()}!`);
          return await int.reply({ embeds: [embed] });
        }

        if (await int.guild.ownerId == user.id) {
          embed.setDescription('You cannot timeout a server\'s owner!');
          await int.reply({ embeds: [ embed ] });
        }
      }

      // if (!int.guild.members.fetch(user).moderatable) {
      //   embed.setDescription(`${user.toString()} is not able to be put in timeout by the bot!`);
      //   return await int.reply({ embeds: [embed] });
      // }

      embed.setTitle('Timeout');
      embed.setDescription(`You have been put in timeout from ${int.guild.name} until <t${Date.now() + (time * 60 * 1000)}> for ${reason}!`);
      await user.createDM();
      await user.send({ embeds: [ embed ] });
      const member = await int.guild.members.fetch(user);
      await member.timeout((time * 60 * 1000), reason);
      embed.setDescription(`${user.toString()} has been put in timeout until <t:${Date.now() + (time * 60 * 1000)}> for ${reason}!`);
      return await int.reply({ embeds: [embed] });

    }
};