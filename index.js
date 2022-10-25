'use strict'
require('dotenv').config();
const Bot = require("./src/models/Bot");
const loadSlashCommands = require("./src/loaders/slashCommandsLoader");
const loadModals = require("./src/loaders/modalsLoader");
const loadContextMenus = require("./src/loaders/contextMenusLoader");

initBot();

function initBot() {
    loadSlashCommands();
    loadContextMenus();
    loadModals();
    let bot = new Bot();
    bot.enable();
    setTimeout(async function () {
        await bot.registerInteractions();
    }, 5000)

}