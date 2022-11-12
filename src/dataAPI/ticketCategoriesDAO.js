'use strict';
const db = require('megadb');
const ticketCategories = new db.crearDB('categories', 'tickets_db');

async function insertTicketCategory(guildID, id, name, description, roleID, transcriptionChannelID) {
    return await ticketCategories.set(`${guildID}.${id}`, {name: name, description: description, roles: [roleID], transcriptionChannel: transcriptionChannelID});
}

async function insertTicketCategoryRole(guildID, categoryID, roleID) {
    let roles = await ticketCategories.get(`${guildID}.${categoryID}.roles`);
    roles.push(roleID);
    return await ticketCategories.set(`${guildID}.${categoryID}.roles`, roles);
}

async function getTicketsCategories() {
    return await ticketCategories.datos();
}

function getTicketsCategoriesCount() {
    return ticketCategories.size();
}

function getTicketsCategoryByID(guildID, categoryID) {
    return ticketCategories.has(`${guildID}.${categoryID}`) ? ticketCategories.get(`${id}`) : null;
}

async function updateTicketCategoryTranscriptionChannelID(guildID, categoryID, transcriptionChannelID) {
    return await ticketCategories.set(`${guildID}.${categoryID}.transcriptionChannel`, transcriptionChannelID);
}

async function removeTicketCategoryRole(guildID, categoryID, roleID) {
    let roles = await ticketCategories.get(`${guildID}.${categoryID}.roles`);
    roles.remove(roleID);
    return await ticketCategories.set(`${guildID}.${categoryID}.roles`, roles);
}

function deleteTicketCategory(guildID, categoryID) {
    return ticketCategories.delete(`${guildID}.${categoryID}`);
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