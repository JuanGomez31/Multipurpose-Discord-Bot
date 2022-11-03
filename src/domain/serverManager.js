const {EmbedBuilder} = require("discord.js");

function getWelcomeMessageEmbed(member, config) {
    return new EmbedBuilder()
        .setTitle(config.title)
        .setDescription(`<@${member.id}>`)
        .addFields(config.fields)
}

async function createChannel(guild, name, type, permissions, parentID) {
    return await guild.channels.create({
        name: name,
        parentId: parentID,
        type: type,
        permissionOverwrites: permissions
    })
}


module.exports = {
    getWelcomeMessageEmbed,
    createChannel
}