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

function getTicketsCategoriesCount() {
    return ticketCategories.size();
}

function getTicketsCategoryByID(categoryID) {
    return ticketCategories.has(`${categoryID}`) ? ticketCategories.get(`${id}`) : null;
}

async function updateTicketCategoryTranscriptionChannelID(categoryID, transcriptionChannelID) {
    return await ticketCategories.set(`${categoryID}.transcriptionChannel`, transcriptionChannelID);
}

async function removeTicketCategoryRole(categoryID, roleID) {
    let roles = await ticketCategories.get(`${categoryID}.roles`);
    roles.remove(roleID);
    return await ticketCategories.set(`${categoryID}.roles`, roles);
}

function deleteTicketCategory(categoryID) {
    return ticketCategories.delete(`${categoryID}`);
}


module.exports = {
    insertTicketCategory,
    insertTicketCategoryRole,
    getTicketsCategories,
    getTicketsCategoriesCount,
    getTicketsCategoryByID,
    updateTicketCategoryTranscriptionChannelID,
    removeTicketCategoryRole,
    deleteTicketCategory
}