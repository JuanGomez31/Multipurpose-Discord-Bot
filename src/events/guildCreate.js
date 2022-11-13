const {createGuild} = require("../domain/guildManager");


module.exports = {
    name: 'guildCreate',
    async run(guild, bot) {
        await createGuild(guild);
    }
}