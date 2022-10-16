const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, Colors } = require('discord.js');
const { goldRoleId, greenRoleId, blueRoleId, purpleRoleId, pinkRoleId } = require('../config.json');

module.exports = {
  id: 'colors',
  async execute(int) {
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
    const remove = new ButtonBuilder()
      .setCustomId('remove')
      .setLabel('Remove')
      .setStyle(ButtonStyle.Danger);
    const row = new ActionRowBuilder()
      .addComponents(gold, green, blue);
    const row2 = new ActionRowBuilder()
      .addComponents(purple, pink, remove)
    const embed = new EmbedBuilder()
      .setTitle('Colors')
      .setDescription('Pick your color!')
      .setColor(Colors.Blurple);

    return await int.reply({ embeds: [ embed ], ephemeral: true, components: [ row, row2 ] });
  },
  async gold(int) {
    const gold = await int.guild.roles.fetch(goldRoleId);
    const green = await int.guild.roles.fetch(greenRoleId);
    const blue = await int.guild.roles.fetch(blueRoleId);
    const purple = await int.guild.roles.fetch(purpleRoleId);
    const pink = await int.guild.roles.fetch(pinkRoleId);
    const member = int.member;

    await member.roles.add(gold, 'picked gold');
    await member.roles.remove(green, 'picked gold');
    await member.roles.remove(blue, 'picked gold');
    await member.roles.remove(purple, 'picked gold');
    await member.roles.remove(pink, 'picked gold');

    return await int.reply({ content: 'Set your color to gold!', ephemeral: true });
  },
  async green(int) {
    const gold = await int.guild.roles.fetch(goldRoleId);
    const green = await int.guild.roles.fetch(greenRoleId);
    const blue = await int.guild.roles.fetch(blueRoleId);
    const purple = await int.guild.roles.fetch(purpleRoleId);
    const pink = await int.guild.roles.fetch(pinkRoleId);
    const member = int.member;

    await member.roles.remove(gold, 'picked green');
    await member.roles.add(green, 'picked green');
    await member.roles.remove(blue, 'picked green');
    await member.roles.remove(purple, 'picked green');
    await member.roles.remove(pink, 'picked green');

    return await int.reply({ content: 'Set your color to green!', ephemeral: true });

  },
  async blue(int) {
    const gold = await int.guild.roles.fetch(goldRoleId);
    const green = await int.guild.roles.fetch(greenRoleId);
    const blue = await int.guild.roles.fetch(blueRoleId);
    const purple = await int.guild.roles.fetch(purpleRoleId);
    const pink = await int.guild.roles.fetch(pinkRoleId);
    const member = int.member;

    await member.roles.remove(gold, 'picked blue');
    await member.roles.remove(green, 'picked blue');
    await member.roles.add(blue, 'picked blue');
    await member.roles.remove(purple, 'picked blue');
    await member.roles.remove(pink, 'picked blue');

    return await int.reply({ content: 'Set your color to blue!', ephemeral: true });

  },
  async purple(int) {
    const gold = await int.guild.roles.fetch(goldRoleId);
    const green = await int.guild.roles.fetch(greenRoleId);
    const blue = await int.guild.roles.fetch(blueRoleId);
    const purple = await int.guild.roles.fetch(purpleRoleId);
    const pink = await int.guild.roles.fetch(pinkRoleId);
    const member = int.member;

    await member.roles.remove(gold, 'picked purple');
    await member.roles.remove(green, 'picked purple');
    await member.roles.remove(blue, 'picked purple');
    await member.roles.add(purple, 'picked purple');
    await member.roles.remove(pink, 'picked purple');

    return await int.reply({ content: 'Set your color to purple!', ephemeral: true });

  },
  async pink(int) {
    const gold = await int.guild.roles.fetch(goldRoleId);
    const green = await int.guild.roles.fetch(greenRoleId);
    const blue = await int.guild.roles.fetch(blueRoleId);
    const purple = await int.guild.roles.fetch(purpleRoleId);
    const pink = await int.guild.roles.fetch(pinkRoleId);
    const member = int.member;

    await member.roles.remove(gold, 'picked pink');
    await member.roles.remove(green, 'picked pink');
    await member.roles.remove(blue, 'picked pink');
    await member.roles.remove(purple, 'picked pink');
    await member.roles.add(pink, 'picked pink');

    return await int.reply({ content: 'Set your color to pink!', ephemeral: true });

  },
  async remove(int) {
    const gold = await int.guild.roles.fetch(goldRoleId);
    const green = await int.guild.roles.fetch(greenRoleId);
    const blue = await int.guild.roles.fetch(blueRoleId);
    const purple = await int.guild.roles.fetch(purpleRoleId);
    const pink = await int.guild.roles.fetch(pinkRoleId);
    const member = int.member;

    await member.roles.remove(gold, 'picked remove');
    await member.roles.remove(green, 'picked remove');
    await member.roles.remove(blue, 'picked remove');
    await member.roles.remove(purple, 'picked remove');
    await member.roles.remove(pink, 'picked remove');

    return await int.reply({ content: 'Removed your color!', ephemeral: true });

  }
}