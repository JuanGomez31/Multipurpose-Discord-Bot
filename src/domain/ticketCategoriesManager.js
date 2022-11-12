const {createChannel, canCreateChannelInGuild} = require("./serverManager");
const {PermissionsBitField} = require("discord.js");
const {ChannelType} = require("discord-api-types/v10");
const {insertTicketCategory, getTicketsCategoriesCount, deleteTicketCategory, getTicketsCategories} = require("../dataAPI/ticketCategoriesDAO");
const {MAX_TICKET_CATEGORIES} = require("../config/system-limits.json");
const {TICKET_CATEGORY_CREATED, MAX_TICKET_CATEGORIES_REACHED, MAX_CHANNELS_IN_GUILD_REACHED} = require("../config/lang.json");

async function createTicketCategory(guild, name, description, role, transcriptionChannel) {
    if (canCreateChannelInGuild(guild)) {
        return MAX_CHANNELS_IN_GUILD_REACHED;
    } else if (await canCreateNewTicketCategory(guild.id)) {
        return MAX_TICKET_CATEGORIES_REACHED;
    }
    let channel = await createChannel(guild, name, ChannelType.GuildCategory, getNewCategoryPermissions(guild, role))
    await insertTicketCategory(guild.id, channel.id, name, description, role.id, transcriptionChannel.id ?? false);
    return TICKET_CATEGORY_CREATED;
}

function removeTicketCategory(guild, categoryID) {
    deleteTicketCategory(guild.id, categoryID);
}

async function getTicketCategoriesOptions(guildID) {
    let response = []
    let categories = await getTicketsCategories();
    for(let id in categories[guildID]) {
        response.push({
            name: categories[guildID][id].name,
            value: id
        })
    }
    return response;
}

async function canCreateNewTicketCategory(guildID) {
    let categories = await getTicketsCategories();
    return Object.keys(categories[guildID]).length <= MAX_TICKET_CATEGORIES;
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
    createTicketCategory,
    removeTicketCategory,
    getTicketCategoriesOptions
}