const SOURCE_CONTEXT_MENU_FILES = "src/interactions/contextMenus";
const Files = require("../models/Files");
const ContextMenu = require("../models/ContextMenu");

function loadContextMenus() {
    let commandsFiles = Files.getAllFiles(SOURCE_CONTEXT_MENU_FILES);
    for (let file of commandsFiles) {
        let sourceFile = require(file);
        console.log(sourceFile)
        new ContextMenu(sourceFile.data.name, sourceFile.data.toJSON(), sourceFile);
    }
}

module.exports = loadContextMenus;