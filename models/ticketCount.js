module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ticketCount', {
    guild_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    tickets: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
  });
};