'use strict';
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    id: {type: String, match: /[0-9]+/},
    prefix: { type: String }
});
const Guilds = mongoose.model("guilds", schema);

async function insertGuild(id, prefix) {
    const guild = new Guilds({
        id: id,
        prefix: prefix
    });
    await guild.save();
}

function deleteGuild(guildID) {
    Guilds.findOneAndRemove({id: guildID}, function (err, guilds) {
        if (err) console.log(err);
    });
}

module.exports = {
    insertGuild,
    deleteGuild
}