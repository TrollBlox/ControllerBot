const { ButtonBuilder, ActionRowBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');
const { maleRoleId, femaleRoleId, otherRoleId } = require('../config.json');

module.exports = {
  id: 'gender',
  async execute(int) {
    const embed = new EmbedBuilder()
      .setTitle('Gender')
      .setDescription('Set your gender');
    const male = new ButtonBuilder()
      .setCustomId('male')
      .setLabel('Male')
      .setStyle(ButtonStyle.Primary);
    const female = new ButtonBuilder()
      .setCustomId('female')
      .setLabel('Female')
      .setStyle(ButtonStyle.Primary);
    const other = new ButtonBuilder()
      .setCustomId('other')
      .setLabel('Other')
      .setStyle(ButtonStyle.Primary);
    const row = new ActionRowBuilder()
      .setComponents(male, female, other);

    return await int.reply({ embeds: [ embed ], ephemeral: true, components: [ row ] });
  },
  async male(int) {
    const male = await int.guild.roles.fetch(maleRoleId);
    const female = await int.guild.roles.fetch(femaleRoleId);
    const other = await int.guild.roles.fetch(otherRoleId);
    const member = int.member;

    await member.roles.add(male, 'picked male');
    await member.roles.remove(female, 'picked male');
    await member.roles.remove(other, 'picked male');

    return await int.reply({ content: 'Set your gender to male!', ephemeral: true });
  },
  async female(int) {
    const male = await int.guild.roles.fetch(maleRoleId);
    const female = await int.guild.roles.fetch(femaleRoleId);
    const other = await int.guild.roles.fetch(otherRoleId);
    const member = int.member;

    await member.roles.remove(male, 'picked female');
    await member.roles.add(female, 'picked female');
    await member.roles.remove(other, 'picked female');

    return await int.reply({ content: 'Set your gender to female!', ephemeral: true });

  },
  async other(int) {
    const male = await int.guild.roles.fetch(maleRoleId);
    const female = await int.guild.roles.fetch(femaleRoleId);
    const other = await int.guild.roles.fetch(otherRoleId);
    const member = int.member;

    await member.roles.remove(male, 'picked other');
    await member.roles.remove(female, 'picked other');
    await member.roles.add(other, 'picked other');

    return await int.reply({ content: 'Set your gender to other!', ephemeral: true });

  }
  
}