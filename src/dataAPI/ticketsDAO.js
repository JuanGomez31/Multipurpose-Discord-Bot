'use strict';
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    id: {type: String, match: /[0-9]+/},
    guildID: { type: String, match: /[0-9]+/},
    user: { type: String, match: /[0-9]+/},
    categoryID: { type: String, match: /[0-9]+/},
    assignedID: { type: String }
});
const Ticket = mongoose.model("tickets", schema)


async function insertTicket(guildID, channelID, userID, categoryID) {
    const ticket = new Ticket({
        id: channelID,
        guildID: guildID,
        categoryID: categoryID,
        user: userID,
        transcriptionChannel: categoryID
    });
    await ticket.save();
}

function deleteTicket(guildID, channelID) {
    Ticket.findOneAndRemove({id: channelID, guildID: guildID}, function (err, categories) {
        if (err) console.log(err);
    });
}

async function getTickets(guildID) {
    return await Ticket.find({ guildID: guildID }).exec();
}


module.exports = {
    insertTicket,
    deleteTicket,
    getTickets
}