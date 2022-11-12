const {createChannel} = require("./serverManager");
const {PermissionsBitField} = require("discord.js");
const {ChannelType} = require("discord-api-types/v10");
const {insertTicketCategory, getTicketsCategoriesCount, deleteTicketCategory, getTicketsCategories} = require("../dataAPI/ticketCategoriesDAO");
const DISCORD_MAX_CATEGORIES = 25;
const {TICKET_CATEGORY_CREATED, MAX_TICKET_CATEGORIES_REACHED} = require("../config/lang.json");

async function createTicketCategory(guild, name, description, role, transcriptionChannel) {
    let categoriesCount = getTicketsCategoriesCount();
    if (categoriesCount > DISCORD_MAX_CATEGORIES) {
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