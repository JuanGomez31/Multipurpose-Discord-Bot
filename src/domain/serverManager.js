const {EmbedBuilder} = require("discord.js");
const {PermissionFlagsBits} = require("discord-api-types/v10");
const {MAX_CHANNELS_IN_GUILD, MAX_CHANNELS_IN_CATEGORY} = require("../config/discord-limits.json");

function getWelcomeMessageEmbed(member, config) {
    return new EmbedBuilder()
        .setTitle(config.title)
        .setDescription(`<@${member.id}>`)
        .addFields(config.fields)
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
    return guild.channels.cache.size === MAX_CHANNELS_IN_GUILD
}

function canCreateChannelInCategory(guild, category) {
    return guild.channels.cache.get(category).children.cache.size === MAX_CHANNELS_IN_CATEGORY;
}

function memberHavePermission(member, permission) {
    return member.permissions.has(permission);
}

function memberIsAdmin(member) {
    return member.permissions.has(PermissionFlagsBits.Administrator)
}


module.exports = {
    getWelcomeMessageEmbed,
    createChannel,
    canCreateChannelInGuild,
    canCreateChannelInCategory,
    memberHavePermission,
    memberIsAdmin
}