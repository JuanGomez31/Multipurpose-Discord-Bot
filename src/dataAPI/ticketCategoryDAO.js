'use strict';
const db = require('megadb');
const ticketCategories = new db.crearDB('categories', 'tickets_db');

async function insertTicketCategory(id, name, description, roleID, transcriptionChannelID) {
    return await ticketCategories.set(`${id}`, {name: name, description: description, roles: [roleID], transcriptionChannel: transcriptionChannelID});
}

async function insertTicketCategoryRole(categoryID, roleID) {
    let roles = await ticketCategories.get(`${categoryID}.roles`);
    roles.push(roleID);
    return await ticketCategories.set(`${categoryID}.roles`, roles);
}

async function getTicketsCategories() {
    return await ticketCategories.datos();
}

async function getTicketsCategoryByID(categoryID) {
    return await ticketCategories.has(`${categoryID}`) ? ticketCategories.get(`${id}`) : null;
}

async function updateTicketCategoryTranscriptionChannelID(categoryID, transcriptionChannelID) {
    return await ticketCategories.set(`${categoryID}.transcriptionChannel`, transcriptionChannelID);
}

async function removeTicketCategoryRole(categoryID, roleID) {
    let roles = await ticketCategories.get(`${categoryID}.roles`);
    roles.remove(roleID);
    return await ticketCategories.set(`${categoryID}.roles`, roles);
}

async function removeTicketCategory(categoryID) {
    return await ticketCategories.delete(`${categoryID}`);
}


module.exports = {
    insertTicketCategory,
    insertTicketCategoryRole,
    getTicketsCategories,
    getTicketsCategoryByID,
    updateTicketCategoryTranscriptionChannelID,
    removeTicketCategoryRole,
    removeTicketCategory
}