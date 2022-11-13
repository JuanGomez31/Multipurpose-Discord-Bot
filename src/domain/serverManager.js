const {EmbedBuilder} = require("discord.js");
const moment = require("moment");
const {PermissionFlagsBits} = require("discord-api-types/v10");
const {MAX_CHANNELS_IN_GUILD, MAX_CHANNELS_IN_CATEGORY} = require("../config/discord-limits.json");
const {
    OWNER_OF_THE_TICKET_FIELD, OWNER_OF_THE_TICKET_ID_FIELD,
    CLOSED_BY_FIELD, CLOSED_BY_ID_FIELD, DATE_OF_CLOSE_FIELD,
    LOG_TICKET_EMBED, MEMBER_ADDED_DESCRIPTION, MEMBER_REMOVED_DESCRIPTION
} = require("../config/lang.json");


function getSimpleEmbed(title, description) {
    return new EmbedBuilder()
        .setTitle(title)
        .setColor(0x990214)
        .setDescription(description);
}

function getTicketLogEmbed(categoryName, ownerID, memberID) {
    return new EmbedBuilder()
        .setTitle(LOG_TICKET_EMBED.replace("${categoryName}", categoryName))
        .setColor(0x990214)
        .addFields(
            {name: OWNER_OF_THE_TICKET_FIELD, value: `<@${ownerID}>`},
            {name: OWNER_OF_THE_TICKET_ID_FIELD, value: `${ownerID}`},
            {name: CLOSED_BY_FIELD, value: `<@${memberID}>`},
            {name: CLOSED_BY_ID_FIELD, value: `${memberID}`},
            {name: DATE_OF_CLOSE_FIELD, value: `${getActualDateWithCustomFormat('MMMM Do YYYY, h:mm:ss a')}`},
        );
}

function getAddedMemberEmbed(memberID, authorID) {
    return new EmbedBuilder()
        .setColor(0x990214)
        .setDescription(MEMBER_ADDED_DESCRIPTION
            .replace("${member}", `<@${memberID}>`)
            .replace("${author}", `<@${authorID}>`));
}

function getRemovedMemberEmbed(memberID, authorID) {
    return new EmbedBuilder()
        .setColor(0x990214)
        .setDescription(MEMBER_REMOVED_DESCRIPTION
            .replace("${member}", `<@${memberID}>`)
            .replace("${author}", `<@${authorID}>`));
}

function getActualDateWithCustomFormat(format) {
    return moment().format(format);
}

async function createChannel(guild, name, type, permissions, parentID) {
    return await guild.channels.create({
        name: name,
        parent: parentID,
        type: type,
        permissionOverwrites: permissions
    })
}

function canCreateChannelInGuild(guild) {
    return guild.channels.cache.size < MAX_CHANNELS_IN_GUILD
}

function canCreateChannelInCategory(guild, category) {
    return guild.channels.cache.get(category).children.cache.size < MAX_CHANNELS_IN_CATEGORY;
}

function memberHavePermission(member, permission) {
    return member.permissions.has(permission);
}

function memberIsAdmin(member) {
    return member.permissions.has(PermissionFlagsBits.Administrator)
}


module.exports = {
    getSimpleEmbed,
    getTicketLogEmbed,
    getRemovedMemberEmbed,
    getAddedMemberEmbed,
    getActualDateWithCustomFormat,
    createChannel,
    canCreateChannelInGuild,
    canCreateChannelInCategory,
    memberHavePermission,
    memberIsAdmin
}