const { ButtonBuilder, ActionRowBuilder, EmbedBuilder, ButtonStyle, Colors } = require('discord.js');
const { maleRoleId, femaleRoleId, otherRoleId } = require('../config.json');

module.exports = {
  id: 'gender',
  async execute(int) {
    const embed = new EmbedBuilder()
      .setTitle('Gender')
      .setDescription('Set your gender')
      .setColor(Colors.Blurple);
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
    const remove = new ButtonBuilder()
      .setCustomId('remove')
      .setLabel('Remove')
      .setStyle(ButtonStyle.Danger);
    const row = new ActionRowBuilder()
      .setComponents(male, female, other, remove);

    await int.reply({ embeds: [ embed ], ephemeral: true, components: [ row ] });
    
    const collector = int.channel.createMessageComponentCollector();

    collector.on('collect', async i => {
      const male = await int.guild.roles.fetch(maleRoleId);
      const female = await int.guild.roles.fetch(femaleRoleId);
      const other = await int.guild.roles.fetch(otherRoleId);
      const member = int.member;
      const embed2 = new EmbedBuilder()
        .setColor(Colors.Blurple);
      const back = new ButtonBuilder()
        .setCustomId('back')
        .setLabel('Back')
        .setStyle(ButtonStyle.Success);
      const row2 = new ActionRowBuilder()
        .addComponents(back);
      switch (i.customId) {
        case 'male':
          await member.roles.add(male, 'picked male');
          await member.roles.remove(female, 'picked male');
          await member.roles.remove(other, 'picked male');
          
          embed2.setDescription('Set your gender to male!')

          await int.editReply({ components: [ row2 ], embeds: [ embed2 ] });
          break;
        case 'female':
          await member.roles.remove(male, 'picked female');
          await member.roles.add(female, 'picked female');
          await member.roles.remove(other, 'picked female');
          
          embed2.setDescription('Set your gender to female!');

          await int.editReply({ components: [ row2 ], embeds: [ embed2 ] });
          break;
        case 'other':
          await member.roles.remove(male, 'picked other');
          await member.roles.remove(female, 'picked other');
          await member.roles.add(other, 'picked other');

          embed2.setDescription('Set your gender to other!');

          await int.editReply({ components: [ row2 ], embeds: [ embed2 ] });
          break;
        case 'remove':
          await member.roles.remove(male, 'picked remove');
          await member.roles.remove(female, 'picked remove');
          await member.roles.remove(other, 'picked remove');

          embed2.setDescription('Removed your gender!')
            .setColor(Colors.Red);

          await int.editReply({ components: [ row2 ], embeds: [ embed2 ] });
          break;
        case 'back':
          await int.editReply({ components: [ row ], embeds: [ embed ]});
          break;
      }
    });
  }
  
}