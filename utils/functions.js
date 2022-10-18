const { ticketCount, tickets } = require('../dbojects');

module.exports = {
  getTicketCount: async function(guild_id) {
    const ticketss = await ticketCount.findOne({
      attributes: ['tickets'],
      where: {
        guild_id: guild_id
      }
    });
    
    if (ticketss) {
      return await ticketss.tickets;
    }

    return 0;
  },

  newTicket: async function(int, newChannelId) {
    this.addTicket(int.guild.id);
    tickets.create({ channel_id: newChannelId, ticket_number: await this.getTicketCount(int.guild.id) + 1, closed: false, opener_id: int.user.id, guild_id: int.guild.id, })
  },

  addTicket: async function(guild_id) {
		let ticketss = await ticketCount.findOne({
			where: { guild_id: guild_id },
		});

		if (ticketss) {
			ticketss.tickets += 1;
			await ticketss.save();
		} else {
		  ticketCount.create({ guild_id: guild_id, tickets: 1 });
      ticketss = await ticketCount.findOne({
        where: { guild_id: guild_id },
      });
    }

  },

  userHasTicket: async function(user_id) {
    let user = await tickets.findOne({
      where: { opener_id: user_id, closed: false }
    });
    return (user);
  },

  closeTicket: async function(channel_id, reason) {
    let tick = await tickets.findOne({
      where: { channel_id: channel_id }
    });
    if (tick) {
      tick.closed = true;
      tick.reason = reason;
      await tick.save();
    }
  },

  getOpener: async function(channel_id) {
    let tick = await tickets.findOne({
      where: { channel_id: channel_id }
    });
    if (tick) {
      return tick.opener_id;
    }
  },

  getAssignee: async function(channel_id) {
    let tick = await tickets.findOne({
      where: { channel_id: channel_id }
    });
    if (tick) {
      return tick.assignee_id;
    }
    return -1;
  },

  setAssignee: async function(channel_id, assignee_id) {
    let tick = await tickets.findOne({
      where: { channel_id: channel_id }
    });
    if (tick) {
      tick.assignee_id = assignee_id;
      await tick.save();
    }
  }

}