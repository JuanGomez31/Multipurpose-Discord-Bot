'use strict'
require('dotenv').config();
const Bot = require("./src/models/Bot");
const loadSlashCommands = require("./src/loaders/slashCommandsLoader");
const loadModals = require("./src/loaders/modalsLoader");
const loadContextMenus = require("./src/loaders/contextMenusLoader");
const loadSubCommands = require("./src/loaders/slashSubCommandsLoader");
const {prepareDatabase} = require("./src/dataAPI/Connection");

initBot();

function initBot() {
    prepareDatabase().catch();
    loadSlashCommands();
    loadSubCommands();
    loadContextMenus();
    loadModals();
    let bot = new Bot();
    bot.enable();
    setTimeout(async function () {
        await bot.registerInteractions();
    }, 5000)

}