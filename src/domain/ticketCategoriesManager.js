const {createChannel, canCreateChannelInGuild} = require("./serverManager");
const {PermissionsBitField} = require("discord.js");
const {ChannelType} = require("discord-api-types/v10");
const {
    insertTicketCategory, deleteTicketCategory,
    getTicketsCategories, updateTicketCategoryTranscriptionChannelID
} = require("../dataAPI/ticketCategoriesDAO");
const {MAX_TICKET_CATEGORIES} = require("../config/system-limits.json");
const {TICKET_CATEGORY_CREATED, MAX_TICKET_CATEGORIES_REACHED, MAX_CHANNELS_IN_GUILD_REACHED} = require("../config/lang.json");

async function createTicketCategory(guild, name, description, role, transcriptionChannel) {
    if (!canCreateChannelInGuild(guild)) {
        return MAX_CHANNELS_IN_GUILD_REACHED;
    } else if (!await canCreateNewTicketCategory(guild.id)) {
        return MAX_TICKET_CATEGORIES_REACHED;
    }
    let channel = await createChannel(guild, name, ChannelType.GuildCategory, getNewCategoryPermissions(guild, role))
    await insertTicketCategory(guild.id, channel.id, name, description, role.id, transcriptionChannel.id ?? false);
    return TICKET_CATEGORY_CREATED;
}

async function removeTicketCategory(guildID, categoryID) {
    await deleteTicketCategory(guildID, categoryID);
}

async function updateDeletedTicketCategoryTranscriptionChannel(guildID, channelID) {
    let categories = await getTicketsCategories(guildID);
    for (let category of categories) {
        if(category.transcriptionChannel === channelID) {
            await updateTicketCategoryTranscriptionChannelID(guildID, category.id, false)
        }
    }
}

async function getTicketCategoriesOptions(guildID) {
    let response = []
    let categories = await getTicketsCategories(guildID);
    for(let category of categories) {
        response.push({
            name: category.name,
            value: category.id
        })
    }
    return response;
}

async function getCategoryByID(guildID, categoryID) {
    let categories = await getTicketsCategories(guildID);
    return categories.find((category) => category.id = categoryID)
}

async function canCreateNewTicketCategory(guildID) {
    let categories = await getTicketsCategories(guildID);
    return categories.length <= MAX_TICKET_CATEGORIES;
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
    updateDeletedTicketCategoryTranscriptionChannel,
    getTicketCategoriesOptions,
    getCategoryByID
}