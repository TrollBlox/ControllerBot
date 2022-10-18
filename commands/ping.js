const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!"),
  async execute(int) {
    int.reply(`The bot's ping is ${int.client.ws.ping}ms!`);
  }
};