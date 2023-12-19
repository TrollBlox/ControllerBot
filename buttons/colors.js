const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, Colors } = require('discord.js');
const { goldRoleId, greenRoleId, blueRoleId, purpleRoleId, pinkRoleId } = require('../config.json');

module.exports = {
  id: 'colors',
  async execute(int) {
    // const gold = new ButtonBuilder()
    //   .setCustomId('gold')
    //   .setLabel('Gold')
    //   .setStyle(ButtonStyle.Primary);
    // const green = new ButtonBuilder()
    //   .setCustomId('green')
    //   .setLabel('Green')
    //   .setStyle(ButtonStyle.Primary);
    // const blue = new ButtonBuilder()
    //   .setCustomId('blue')
    //   .setLabel('Blue')
    //   .setStyle(ButtonStyle.Primary);
    // const purple = new ButtonBuilder()
    //   .setCustomId('purple')
    //   .setLabel('Purple')
    //   .setStyle(ButtonStyle.Primary);
    // const pink = new ButtonBuilder()
    //   .setCustomId('pink')
    //   .setLabel('Pink')
    //   .setStyle(ButtonStyle.Primary);
    // const remove = new ButtonBuilder()
    //   .setCustomId('remove')
    //   .setLabel('Remove')
    //   .setStyle(ButtonStyle.Danger);
    // const row = new ActionRowBuilder()
    //   .addComponents(gold, green, blue);
    // const row2 = new ActionRowBuilder()
    //   .addComponents(purple, pink, remove);
    // const embed = new EmbedBuilder()
    //   .setTitle('Colors')
    //   .setDescription('Pick your color!')
    //   .setColor(Colors.Blurple);

    // await int.reply({ embeds: [ embed ], ephemeral: true, components: [ row, row2 ] });

    // const collector = int.channel.createMessageComponentCollector();

    // collector.on('collect', async i => {
    //   const gold = await int.guild.roles.fetch(goldRoleId);
    //   const green = await int.guild.roles.fetch(greenRoleId);
    //   const blue = await int.guild.roles.fetch(blueRoleId);
    //   const purple = await int.guild.roles.fetch(purpleRoleId);
    //   const pink = await int.guild.roles.fetch(pinkRoleId);
    //   const member = int.member;
    //   const embed2 = new EmbedBuilder();
    //   const back = new ButtonBuilder()
    //     .setCustomId('back')
    //     .setLabel('Back')
    //     .setStyle(ButtonStyle.Success);
    //   const row3 = new ActionRowBuilder()
    //     .addComponents(back);
    //   switch (i.customId) {
    //     case 'gold':
    //       await member.roles.add(gold, 'picked gold');
    //       await member.roles.remove(green, 'picked gold');
    //       await member.roles.remove(blue, 'picked gold');
    //       await member.roles.remove(purple, 'picked gold');
    //       await member.roles.remove(pink, 'picked gold');
      
    //       embed2.setDescription('Set your color to Gold')
    //         .setColor(Colors.Gold);
      
    //       await int.editReply({ components: [ row3 ], embeds: [ embed2 ] });
    //       break;
    //     case 'green':
    //       await member.roles.remove(gold, 'picked green');
    //       await member.roles.add(green, 'picked green');
    //       await member.roles.remove(blue, 'picked green');
    //       await member.roles.remove(purple, 'picked green');
    //       await member.roles.remove(pink, 'picked green');

    //       embed2.setDescription('Set your color to Green')
    //         .setColor(Colors.Green);
      
    //       await int.editReply({ components: [ row3 ], embeds: [ embed2 ] });
    //       break;
    //     case 'blue':
    //       await member.roles.remove(gold, 'picked blue');
    //       await member.roles.remove(green, 'picked blue');
    //       await member.roles.add(blue, 'picked blue');
    //       await member.roles.remove(purple, 'picked blue');
    //       await member.roles.remove(pink, 'picked blue');

    //       embed2.setDescription('Set your color to Blue')
    //         .setColor(Colors.Blue);

    //       await int.editReply({ components: [ row3 ], embeds: [ embed2 ] });
    //       break;
    //     case 'purple':
    //       await member.roles.remove(gold, 'picked purple');
    //       await member.roles.remove(green, 'picked purple');
    //       await member.roles.remove(blue, 'picked purple');
    //       await member.roles.add(purple, 'picked purple');
    //       await member.roles.remove(pink, 'picked purple');
      
    //       embed2.setDescription('Set your color to Purple')
    //         .setColor(Colors.Purple);
      
    //       await int.editReply({ components: [ row3 ], embeds: [ embed2 ] });
    //       break;
    //     case 'pink':
    //       await member.roles.remove(gold, 'picked pink');
    //       await member.roles.remove(green, 'picked pink');
    //       await member.roles.remove(blue, 'picked pink');
    //       await member.roles.remove(purple, 'picked pink');
    //       await member.roles.add(pink, 'picked pink');
      
    //       embed2.setDescription('Set your color to Pink')
    //         .setColor(Colors.LuminousVividPink);
      
    //       await int.editReply({ components: [ row3 ], embeds: [ embed2 ] });
    //       break;
    //     case 'remove':
    //       await member.roles.remove(gold, 'picked remove');
    //       await member.roles.remove(green, 'picked remove');
    //       await member.roles.remove(blue, 'picked remove');
    //       await member.roles.remove(purple, 'picked remove');
    //       await member.roles.remove(pink, 'picked remove');
      
    //       embed2.setDescription('Removed your color')
    //         .setColor(Colors.Red);
      
    //       await int.editReply({ components: [ row3 ], embeds: [ embed2 ] });
    //       break;
    //     case 'back':
    //       await int.editReply({ embeds: [ embed ], ephemeral: true, components: [ row, row2 ] });
    //       break;

    //   }
    // });
  },
}