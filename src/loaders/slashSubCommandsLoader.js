const SOURCE_SLASH_SUB_COMMANDS_FILES = "src/interactions/subCommands";
const Files = require("../models/Files");
const SlashSubCommand = require("../models/SlashSubCommand");

function loadSubCommands() {
    let subCommandsRoutes = Files.getAllDirectoriesOfRoute(SOURCE_SLASH_SUB_COMMANDS_FILES);
    for (let subCommandRoute of subCommandsRoutes) {
        let subCommandData = require(`${subCommandRoute}\\index.js`).getSlashCommandJSON();
        for(let subCommand of subCommandData.options) {
            if(subCommand.options[0].options) {
                readSubCommandsGroups(subCommandRoute, subCommand.options, subCommandData.name, subCommandData, subCommand.name)
            } else {
                let commandFile = require(`${subCommandRoute}\\commands\\${subCommand.name}`)
                new SlashSubCommand(subCommand.name, subCommandData.name, subCommandData, null, commandFile)
            }
        }
    }
}

function readSubCommandsGroups(subCommandRoute,subCommandOptions, commandName, subCommandData, group) {
    for(let option of subCommandOptions) {
        let commandFile = require(`${subCommandRoute}\\${group}\\${option.name}`)
        new SlashSubCommand(option.name, subCommandData.name, subCommandData, group, commandFile)
    }
}

module.exports = loadSubCommands;