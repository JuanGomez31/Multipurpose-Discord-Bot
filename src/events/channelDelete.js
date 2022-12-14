const {ChannelType} = require("discord-api-types/v10");
const {removeTicketCategory, updateDeletedTicketCategoryTranscriptionChannel} = require("../domain/ticketCategoriesManager");
const {removeTicket} = require("../domain/ticketManager");



module.exports = {
    name: 'channelDelete',
    async run(channel, bot) {
        if (channel.type === ChannelType.GuildCategory) {
            await removeTicketCategory(channel.guild.id, channel.id)
        } else if (channel.type === ChannelType.GuildText) {
            removeTicket(channel.guild.id, channel.id);
            updateDeletedTicketCategoryTranscriptionChannel(channel.guild.id, channel.id).catch();
        }
    }
}