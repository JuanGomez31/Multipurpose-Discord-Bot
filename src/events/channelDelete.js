const {ChannelType} = require("discord-api-types/v10");
const {removeTicketCategory} = require("../domain/ticketCategoriesManager");



module.exports = {
    name: 'channelDelete',
    run(channel, bot) {
        if(channel.type === ChannelType.GuildCategory) {
            removeTicketCategory(channel.id)
        }
    }
}