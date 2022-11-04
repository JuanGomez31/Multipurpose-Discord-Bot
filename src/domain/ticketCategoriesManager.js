const {createChannel} = require("./serverManager");
const {PermissionsBitField} = require("discord.js");
const {ChannelType} = require("discord-api-types/v10");
const {insertTicketCategory} = require("../dataAPI/ticketCategoryDAO");
const {TICKET_CATEGORY_CREATED} = require("../config/lang.json");

async function createTicketCategory(guild, name, description, role, transcriptionChannel) {
    let channel = await createChannel(guild, name, ChannelType.GuildCategory, getNewCategoryPermissions(guild, role))
    await insertTicketCategory(channel.id, name, description, role.id, transcriptionChannel.id ?? false);
    return TICKET_CATEGORY_CREATED;
}


function getNewCategoryPermissions(guild, role) {
    return [
        {
            id: guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
            id: role.id,
            allow: [PermissionsBitField.Flags.ViewChannel]
        }
    ]
}

module.exports = {
    createTicketCategory
}