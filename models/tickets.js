module.exports = (sequelize, DataTypes) => {
  return sequelize.define('tickets', {
    channel_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    ticket_number: {
      type: DataTypes.INTEGER
    },
    closed: {
      type: DataTypes.BOOLEAN
    },
    assignee_id: {
      type: DataTypes.STRING
    },
    reason: {
      type: DataTypes.STRING
    },
    opener_id: {
      type: DataTypes.STRING
    },
    guild_id: {
      type: DataTypes.STRING
    },
    open_time: {
      type: DataTypes.STRING
    },
    close_time: {
      type: DataTypes.STRING
    },
    closer: {
      type: DataTypes.STRING
    },
    assigned_at: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
  });
};