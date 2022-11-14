const { ChannelType } = require('discord.js');

function announceMessage(message) {
    if(isNewsChannel(message)) {
        message.crosspost().catch();
    }
}

function isNewsChannel(message){
    return message.channel.type === ChannelType.GuildAnnouncement;
}

module.exports = {
    name: "messageCreate",
    async run(message, bot) {
        announceMessage(message);
    }
}

