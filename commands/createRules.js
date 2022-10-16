const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Colors } = require('discord.js');
const { rulesChannel } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createrules")
    .setDescription("Deletes all messages in #welcome and sends an updated rules message"),
  async execute(int) {
    const rules = new ButtonBuilder()
      .setCustomId('rules')
      .setLabel('Rules')
      .setStyle(ButtonStyle.Primary);
    const roles = new ButtonBuilder()
      .setCustomId('roles')
      .setLabel('Roles')
      .setStyle(ButtonStyle.Secondary);
    const row = new ActionRowBuilder()
      .addComponents(rules, roles);
    const embed = new EmbedBuilder()
      .setTitle('Welcome!')
      .setDescription('Things to do around here:\n\nRead the rules\n\nGet roles')
      .setColor(Colors.Blurple);

    const channel = await int.client.channels.fetch(rulesChannel);

    await channel.messages.fetch({ limit: 100 }).then(messages => {
      messages.forEach(async message => await message.delete());
    });
    
    channel.send({ embeds: [ embed ], components: [ row ] });
    int.reply('Done.');
  }
}