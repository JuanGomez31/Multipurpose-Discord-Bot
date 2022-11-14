'use strict'
const SOURCE_EVENTS_FILES = 'src/events/';
const { REST, Routes } = require('discord.js');
const {Client, IntentsBitField} = require("discord.js");
const Events = require("./Events");
const Files = require("./Files");
const SlashCommand = require("./SlashCommand");
const ContextMenu = require("./ContextMenu");
const SlashSubCommand = require("./SlashSubCommand");
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

class Bot {

    constructor() {
        let intentsBits = new IntentsBitField(32767);
        this.instance = new Client({ intents: intentsBits });
        Events.runEventFiles(this.instance, Files.getAllFiles(SOURCE_EVENTS_FILES));
    }

    enable() {
        this.instance.login(process.env.TOKEN);
    }

    async registerInteractions() {
        let interactions =  [].concat(SlashCommand.getSlashCommandsData(),
            ContextMenu.getContextMenusData(),
            SlashSubCommand.getSlashSubCommandsData())
        await rest.put(
            Routes.applicationCommands(this.instance.application.id),
            {body: interactions},
        );
    }

}

module.exports = Bot;