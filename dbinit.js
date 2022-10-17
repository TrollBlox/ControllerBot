const force = process.argv.includes('--force') || process.argv.includes('-f');
console.log(`${new Date(Date.now())}: <console> - Database ${force ? 'reset' : 'sync'}ing...`);

const Sequelize = require('sequelize');
const config = require('./config.json')

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
});

require('./models/tickets.js')(sequelize, Sequelize.DataTypes);
require('./models/ticketCount.js')(sequelize, Sequelize.DataTypes);

sequelize.sync({ force }).then(async () => {
  console.log(`${new Date(Date.now())}: <console> - Database ${force ? 'reset' : 'synced'}.`);

  sequelize.close();
}).catch(console.error);