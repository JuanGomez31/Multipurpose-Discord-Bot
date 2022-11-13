const {insertGuild, deleteGuild} = require("../dataAPI/guildsDAO");
const {prefix} = require("../config/default.json")

async function createGuild(guild) {
    await insertGuild(guild.id, prefix);
}

function removeGuild(guild) {
    deleteGuild(guild.id);
}


module.exports = {
    createGuild,
    removeGuild
}