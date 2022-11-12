'use strict';
const db = require('megadb');
const tickets = new db.crearDB('tickets', 'tickets_db');

async function insertTicket(guildID, id, userID) {
    return await tickets.set(`${guildID}.${id}`, {user: userID, assigned: null, guests: []});
}

async function insertTicketGuest(guildID, ticketID, guestID) {
    let guests = await tickets.get(`${guildID}.${ticketID}.guests`);
    guests.push(guestID);
    return await tickets.set(`${guildID}.${ticketID}.guests`, guests);
}

async function updateAssignedUserID(guildID, ticketID, userID) {
    return await tickets.set(`${guildID}.${ticketID}.assigned`, userID);
}

async function removeTicketGuest(guildID, ticketID, guestID) {
    let guests = await tickets.get(`${guildID}.${ticketID}.guests`);
    guests.remove(guestID);
    return await tickets.set(`${guildID}.${ticketID}.guests`, guests);
}

async function removeTicket(guildID, ticketID) {
    return tickets.delete(`${guildID}.${ticketID}`);
}

module.exports = {
    insertTicket,
    insertTicketGuest,
    updateAssignedUserID,
    removeTicketGuest,
    removeTicket
}