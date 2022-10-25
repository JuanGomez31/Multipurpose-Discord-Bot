const {EmbedBuilder} = require("discord.js");


function getWelcomeMessageEmbed(member, config) {
    return new EmbedBuilder()
        .setTitle(config.title)
        .setDescription(`<@${member.id}>`)
        .addFields(config.fields)
}


module.exports = {
    getWelcomeMessageEmbed
}