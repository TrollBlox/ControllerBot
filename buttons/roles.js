const { EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { maleRoleId, femaleRoleId, otherRoleId } = require('../config.json');
const { goldRoleId, greenRoleId, blueRoleId, purpleRoleId, pinkRoleId } = require('../config.json');

module.exports = {
  id: 'roles',
  async execute(int) {
    const colors = new ButtonBuilder()
      .setCustomId('colors')
      .setLabel('Colors')
      .setStyle(ButtonStyle.Primary);
    const gender = new ButtonBuilder()
      .setCustomId('gender')
      .setLabel('Gender')
      .setStyle(ButtonStyle.Primary);
    const mainRow = new ActionRowBuilder()
      .addComponents(colors, gender)

    const mainEmbed = new EmbedBuilder()
      .setDescription('Pick roles!')
      .setColor(Colors.Blurple);

    await int.reply({ embeds: [ mainEmbed ], components: [ mainRow ], ephemeral: true });

    const collector = int.channel.createMessageComponentCollector();

    collector.on('collect', async i => {
      const male = await int.guild.roles.fetch(maleRoleId);
      const female = await int.guild.roles.fetch(femaleRoleId);
      const other = await int.guild.roles.fetch(otherRoleId);
      const member = int.member;
      const embed2 = new EmbedBuilder()
        .setColor(Colors.Blurple);
      const backToGender = new ButtonBuilder()
        .setCustomId('backToGender')
        .setLabel('Back')
        .setStyle(ButtonStyle.Success);
      const backToGenderRow = new ActionRowBuilder()
        .addComponents(backToGender);
      const backToColor = new ButtonBuilder()
        .setCustomId('backToColor')
        .setLabel('Back')
        .setStyle(ButtonStyle.Success);
      const backToColorRow = new ActionRowBuilder()
        .addComponents(backToColor);
      const embed = new EmbedBuilder()
        .setTitle('Gender')
        .setDescription('Set your gender')
        .setColor(Colors.Blurple);
      const maleb = new ButtonBuilder()
        .setCustomId('male')
        .setLabel('Male')
        .setStyle(ButtonStyle.Primary);
      const femaleb = new ButtonBuilder()
        .setCustomId('female')
        .setLabel('Female')
        .setStyle(ButtonStyle.Primary);
      const otherb = new ButtonBuilder()
        .setCustomId('other')
        .setLabel('Other')
        .setStyle(ButtonStyle.Primary);
      const remove = new ButtonBuilder()
        .setCustomId('remove')
        .setLabel('Remove')
        .setStyle(ButtonStyle.Danger);
      const backToMain = new ButtonBuilder()
        .setCustomId('backToMain')
        .setLabel('Back')
        .setStyle(ButtonStyle.Primary)
      const genderRow = new ActionRowBuilder()
        .addComponents(maleb, femaleb, otherb, remove, backToMain)
      const gold = new ButtonBuilder()
        .setCustomId('gold')
        .setLabel('Gold')
        .setStyle(ButtonStyle.Primary);
      const green = new ButtonBuilder()
        .setCustomId('green')
        .setLabel('Green')
        .setStyle(ButtonStyle.Primary);
      const blue = new ButtonBuilder()
        .setCustomId('blue')
        .setLabel('Blue')
        .setStyle(ButtonStyle.Primary);
      const purple = new ButtonBuilder()
        .setCustomId('purple')
        .setLabel('Purple')
        .setStyle(ButtonStyle.Primary);
      const pink = new ButtonBuilder()
        .setCustomId('pink')
        .setLabel('Pink')
        .setStyle(ButtonStyle.Primary);
      const removeColor = new ButtonBuilder()
        .setCustomId('remove')
        .setLabel('Remove')
        .setStyle(ButtonStyle.Danger);
      const colorRow = new ActionRowBuilder()
        .addComponents(gold, green, blue);
      const colorRow2 = new ActionRowBuilder()
        .addComponents(purple, pink, removeColor, backToMain);
      const goldRole = await int.guild.roles.fetch(goldRoleId);
      const greenRole = await int.guild.roles.fetch(greenRoleId);
      const blueRole = await int.guild.roles.fetch(blueRoleId);
      const purpleRole = await int.guild.roles.fetch(purpleRoleId);
      const pinkRole = await int.guild.roles.fetch(pinkRoleId);
      const back = new ButtonBuilder()
        .setCustomId('backColor')
        .setLabel('Back')
        .setStyle(ButtonStyle.Success);
      const row3 = new ActionRowBuilder()
        .addComponents(back);
      switch (i.customId) {
        case 'gold':
          await member.roles.add(goldRole, 'picked gold');
          await member.roles.remove(greenRole, 'picked gold');
          await member.roles.remove(blueRole, 'picked gold');
          await member.roles.remove(purpleRole, 'picked gold');
          await member.roles.remove(pinkRole, 'picked gold');
      
          embed2.setDescription('Set your color to Gold')
            .setColor(Colors.Gold);
      
          await int.editReply({ components: [ row3 ], embeds: [ embed2 ] });
          break;
        case 'green':
          await member.roles.remove(goldRole, 'picked green');
          await member.roles.add(greenRole, 'picked green');
          await member.roles.remove(blueRole, 'picked green');
          await member.roles.remove(purpleRole, 'picked green');
          await member.roles.remove(pinkRole, 'picked green');

          embed2.setDescription('Set your color to Green')
            .setColor(Colors.Green);
      
          await int.editReply({ components: [ row3 ], embeds: [ embed2 ] });
          break;
        case 'blue':
          await member.roles.remove(goldRole, 'picked blue');
          await member.roles.remove(greenRole, 'picked blue');
          await member.roles.add(blueRole, 'picked blue');
          await member.roles.remove(purpleRole, 'picked blue');
          await member.roles.remove(pinkRole, 'picked blue');

          embed2.setDescription('Set your color to Blue')
            .setColor(Colors.Blue);

          await int.editReply({ components: [ row3 ], embeds: [ embed2 ] });
          break;
        case 'purple':
          await member.roles.remove(goldRole, 'picked purple');
          await member.roles.remove(greenRole, 'picked purple');
          await member.roles.remove(blueRole, 'picked purple');
          await member.roles.add(purpleRole, 'picked purple');
          await member.roles.remove(pinkRole, 'picked purple');
      
          embed2.setDescription('Set your color to Purple')
            .setColor(Colors.Purple);
      
          await int.editReply({ components: [ row3 ], embeds: [ embed2 ] });
          break;
        case 'pink':
          await member.roles.remove(goldRole, 'picked pink');
          await member.roles.remove(greenRole, 'picked pink');
          await member.roles.remove(blueRole, 'picked pink');
          await member.roles.remove(purpleRole, 'picked pink');
          await member.roles.add(pinkRole, 'picked pink');
      
          embed2.setDescription('Set your color to Pink')
            .setColor(Colors.LuminousVividPink);
      
          await int.editReply({ components: [ row3 ], embeds: [ embed2 ] });
          break;
        case 'remove':
          await member.roles.remove(goldRole, 'picked remove');
          await member.roles.remove(greenRole, 'picked remove');
          await member.roles.remove(blueRole, 'picked remove');
          await member.roles.remove(purpleRole, 'picked remove');
          await member.roles.remove(pinkRole, 'picked remove');
      
          embed2.setDescription('Removed your color')
            .setColor(Colors.Red);
      
          await int.editReply({ components: [ row3 ], embeds: [ embed2 ] });
          break;
        // case 'backColor':
        //   await int.editReply({ embeds: [ embed ], ephemeral: true, components: [ colorRow, colorRow2 ] });
        //   break;

        case 'backToMain':
          await int.editReply({ embeds: [ mainEmbed ], components: [ mainRow ] });
          break;
        case 'gender':
          embed.setDescription('Pick gender');
          await int.editReply({ embeds: [ embed ], components: [ genderRow ]});
          break;
        case 'colors':
        case 'backColor':
          embed.setDescription('Pick color');
          await int.editReply({ embeds: [ embed ], components: [ colorRow, colorRow2 ]});
          break;
        case 'male':
          await member.roles.add(male, 'picked male');
          await member.roles.remove(female, 'picked male');
          await member.roles.remove(other, 'picked male');
          
          embed2.setDescription('Set your gender to male!')

          await int.editReply({ components: [ backToGenderRow ], embeds: [ embed2 ] });
          break;
        case 'female':
          await member.roles.remove(male, 'picked female');
          await member.roles.add(female, 'picked female');
          await member.roles.remove(other, 'picked female');
          
          embed2.setDescription('Set your gender to female!');

          await int.editReply({ components: [ backToGenderRow ], embeds: [ embed2 ] });
          break;
        case 'other':
          await member.roles.remove(male, 'picked other');
          await member.roles.remove(female, 'picked other');
          await member.roles.add(other, 'picked other');

          embed2.setDescription('Set your gender to other!');

          await int.editReply({ components: [ backToGenderRow ], embeds: [ embed2 ] });
          break;
        case 'remove':
          await member.roles.remove(male, 'picked remove');
          await member.roles.remove(female, 'picked remove');
          await member.roles.remove(other, 'picked remove');

          embed2.setDescription('Removed your gender!')
            .setColor(Colors.Red);

          await int.editReply({ components: [ backToGenderRow ], embeds: [ embed2 ] });
          break;
        case 'backToColor':
          await int.editReply({ components: [ backToColorRow ], embeds: [ embed ]});
          break;
        case 'backToGender':
          embed.setDescription('Pick gender');
          await int.editReply({ embeds: [ embed ], components: [ genderRow ]});
          break;
      }
    });
  }
}