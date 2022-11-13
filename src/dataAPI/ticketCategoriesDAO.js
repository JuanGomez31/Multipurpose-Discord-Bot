'use strict';
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    id: {type: String, match: /[0-9]+/},
    guildID: { type: String, match: /[0-9]+/},
    name: { type: String },
    description: { type: String },
    roles: { type: Array, default: [], match: /[0-9]+/ },
    transcriptionChannel: { type: String },
});
const TicketCategory = mongoose.model("ticket-categories", schema)


async function insertTicketCategory(guildID, id, name, description, roleID, transcriptionChannelID) {
    const ticketCategory = new TicketCategory({
        id: id,
        guildID: guildID,
        name: name,
        description: description,
        roles: [roleID],
        transcriptionChannel: transcriptionChannelID
    });
    await ticketCategory.save();
}


async function getTicketsCategories(guildID) {
    return await TicketCategory.find({ guildID: guildID }).exec();
}

async function updateTicketCategoryTranscriptionChannelID(guildID, categoryID, transcriptionChannelID) {
    TicketCategory.updateMany({
        guildID: guildID, id: categoryID
    }, { $set: { transcriptionChannel: transcriptionChannelID }}, function(err, res) {
        if (err) console.log(err);
    });
}

function deleteTicketCategory(guildID, categoryID) {
    TicketCategory.findOneAndRemove({id: categoryID, guildID: guildID}, function (err, categories) {
        if (err) console.log(err);
    });
}

module.exports = {
    insertTicketCategory,
    getTicketsCategories,
    updateTicketCategoryTranscriptionChannelID,
    deleteTicketCategory
}