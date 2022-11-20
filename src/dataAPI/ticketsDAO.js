'use strict';
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    id: {type: String, match: /[0-9]+/},
    guildID: { type: String, match: /[0-9]+/},
    user: { type: String, match: /[0-9]+/},
    categoryID: { type: String, match: /[0-9]+/},
    guests: {type: Array, match: /[0-9]+/},
    assignedID: { type: String }
});
const Ticket = mongoose.model("tickets", schema)


async function insertTicket(guildID, channelID, userID, categoryID) {
    const ticket = new Ticket({
        id: channelID,
        guildID: guildID,
        categoryID: categoryID,
        user: userID,
        guests: [],
        transcriptionChannel: categoryID
    });
    await ticket.save();
}

async function insertGuestToTicket(guildID, channelID, userID) {
    Ticket.updateMany({
        guildID: guildID, id: channelID
    }, { $push: { guests: userID }}, function(err, res) {
        if (err) console.log(err);
    });
}

function deleteTicket(guildID, channelID) {
    Ticket.findOneAndRemove({id: channelID, guildID: guildID}, function (err, categories) {
        if (err) console.log(err);
    });
}

async function deleteGuestFromTicket(guildID, channelID, userID) {
    Ticket.updateOne({
        guildID: guildID, id: channelID
    }, { $pullAll: { guests: [userID] }}, function(err, res) {
        if (err) console.log(err);
    });
}

async function getTickets(guildID) {
    return await Ticket.find({ guildID: guildID }).exec();
}

async function getTicketOnGuildByID(guildID, channelID) {
    return await Ticket.findOne({ guildID: guildID, id: channelID }).exec();
}

module.exports = {
    insertTicket,
    insertGuestToTicket,
    deleteTicket,
    deleteGuestFromTicket,
    getTickets,
    getTicketOnGuildByID
}