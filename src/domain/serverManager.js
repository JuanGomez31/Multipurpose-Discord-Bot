const {EmbedBuilder} = require("discord.js");
const {PermissionFlagsBits} = require("discord-api-types/v10");

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

function memberHavePermission(member, permission) {
    return member.permissions.has(permission);
}

function memberIsAdmin(member) {
    return member.permissions.has(PermissionFlagsBits.Administrator)
}


module.exports = {
    getWelcomeMessageEmbed,
    createChannel,
    memberHavePermission,
    memberIsAdmin
}