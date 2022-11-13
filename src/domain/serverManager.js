const {EmbedBuilder} = require("discord.js");
const {PermissionFlagsBits} = require("discord-api-types/v10");
const {MAX_CHANNELS_IN_GUILD, MAX_CHANNELS_IN_CATEGORY} = require("../config/discord-limits.json");
const moment = require("moment");

function getSimpleEmbed(title, description) {
    return new EmbedBuilder()
        .setTitle(title)
        .setColor(0x990214)
        .setDescription(description);
}

function getTicketLogEmbed(categoryName, ownerID, memberID) {
    return new EmbedBuilder()
        .setTitle(`Ticket de ${categoryName} cerrado`)
        .setColor(0x990214)
        .addFields(
            {name: "Propietario del ticket", value: `<@${ownerID}>`},
            {name: "ID del propietario del ticket", value: `${ownerID}`},
            {name: "Cerro el ticket", value: `<@${memberID}>`},
            {name: "ID del que cerro el ticket", value: `${memberID}`},
            {name: "Fecha de cierre", value: `${getActualDateWithCustomFormat('MMMM Do YYYY, h:mm:ss a')}`},
        );
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
    getActualDateWithCustomFormat,
    createChannel,
    canCreateChannelInGuild,
    canCreateChannelInCategory,
    memberHavePermission,
    memberIsAdmin
}