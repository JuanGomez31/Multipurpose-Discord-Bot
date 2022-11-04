'use strict'
require('dotenv').config();
const Bot = require("./src/models/Bot");
const loadSlashCommands = require("./src/loaders/slashCommandsLoader");
const loadModals = require("./src/loaders/modalsLoader");
const loadContextMenus = require("./src/loaders/contextMenusLoader");
const loadSubCommands = require("./src/loaders/slashSubCommandsLoader");

initBot();

function initBot() {
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