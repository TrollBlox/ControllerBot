const { SlashCommandBuilder, EmbedBuilder, Colors, PermissionsBitField } = require('discord.js');

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
      .setRequired(false)),
    async execute(int) {
      const user = await int.options.getUser('user');
      const reason = await int.options.getString('reason') || 'No reason provided';
      const embed = EmbedBuilder();
      await embed.setColor(Colors.Blurple);

      if (!(int.guild.members.fetch(int.author).permissions.has( [ PermissionsBitField.Flags.BanMembers ] ))) {
        await embed.setName('Error');
        await embed.setDescription(`You cannot ban members!`);
        return await int.reply({ embeds: [embed] });
      }

      if (int.member.roles.highest.comparePositionTo(int.guild.members.cache.get(user.id).roles.highest) < 1) {
        await embed.setName('Error');
        await embed.setDescription(`You cannot ban <@${user.id}>!`);
        return await int.reply({ embeds: [embed] });
      }

      if (!int.guild.members.fetch(user).bannable) {
        await embed.setName('Error');
        await embed.setDescription(`<@${user.id}> is not bannable by the bot!`);
        return await int.reply({ embeds: [embed] });
      }

      await embed.setName('Ban');
      await embed.setDescription(`You have been banned from ${int.guild.name} for ${reason}!`);
      await user.createDM();
      await user.send({ embeds: [ embed ] } );
      await int.guild.members.fetch(user).ban({ reason: reason });
      await embed.setDescription(`<@${user.id}> has been banned for ${reason}!`);
      return await int.reply({ embeds: [embed] });

    }
};