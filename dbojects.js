const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
});

const tickets = require('./models/tickets.js')(sequelize, Sequelize.DataTypes);
const ticketCount = require('./models/ticketCount.js')(sequelize, Sequelize.DataTypes);

Reflect.defineProperty(tickets.prototype, 'addTicket', {
  value: async function addTicket(guild_id) {
    const ticket = await tickets.findOne({
      where: { guild_id: guild_id },
    });
    if (ticket) {
      tickets.tickets += Number(1);
      return tickets.save();
    }
    return tickets.create({ guild_id: guild_id, tickets: 1 });
  }
});

module.exports = { tickets, ticketCount };