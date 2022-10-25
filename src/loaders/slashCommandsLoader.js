const SOURCE_SLASH_COMMANDS_FILES = "src/interactions/commands";
const Files = require("../models/Files");
const SlashCommand = require("../models/SlashCommand");

function loadSlashCommands() {
    let commandsFiles = Files.getAllFiles(SOURCE_SLASH_COMMANDS_FILES);
    for (let file of commandsFiles) {
        let sourceFile = require(file);
        new SlashCommand(sourceFile.data.name, sourceFile.data.toJSON(), sourceFile.category, sourceFile);
    }
}

module.exports = loadSlashCommands;