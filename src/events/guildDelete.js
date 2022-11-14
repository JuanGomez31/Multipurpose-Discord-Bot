const {createGuild, removeGuild} = require("../domain/guildManager");


module.exports = {
    name: 'guildDelete',
    async run(guild, bot) {
        removeGuild(guild);
    }
}