'use strict';
const db = require('megadb');
const tickets = new db.crearDB('tickets', 'tickets_db');

async function insertTicket(id, userID) {
    return await tickets.set(`${id}`, {user: userID, assigned: null, guests: []});
}

async function insertTicketGuest(ticketID, guestID) {
    let guests = await tickets.get(`${ticketID}.guests`);
    guests.push(guestID);
    return await tickets.set(`${ticketID}.guests`, guests);
}

async function updateAssignedUserID(ticketID, userID) {
    return await tickets.set(`${ticketID}.assigned`, userID);
}

async function removeTicketGuest(ticketID, guestID) {
    let guests = await tickets.get(`${ticketID}.guests`);
    guests.remove(guestID);
    return await tickets.set(`${ticketID}.guests`, guests);
}

async function removeTicket(ticketID) {
    return tickets.delete(`${ticketID}`);
}

module.exports = {
    insertTicket,
    insertTicketGuest,
    updateAssignedUserID,
    removeTicketGuest,
    removeTicket
}