const {getWelcomeMessageEmbed} = require("../domain/serverManager");
const {WELCOME_CONFIG} = require("../config/welcome.json");

function sendWelcomeEmbed(bot, member) {
    try {
        let embed = getWelcomeMessageEmbed(member, WELCOME_CONFIG)
        let channel = bot.channels.cache.get(WELCOME_CONFIG.channelID);
        channel.send({embeds: [embed]}).catch();
    } catch (e) {
        console.log(`${bot.user.username} - Error en mensaje de bienvenida`)
    }
}

module.exports = {
    name: 'guildMemberAdd',
    run(member, bot) {
        sendWelcomeEmbed(bot, member)
    }
}