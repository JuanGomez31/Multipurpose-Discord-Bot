let SOURCE_MODALS_FILES = "src/interactions/modals";
const Files = require("../models/Files");
const Modal = require("../models/Modal");

function loadModals() {
    let modalsFiles = Files.getAllFiles(SOURCE_MODALS_FILES);
    for (let file of modalsFiles) {
        let sourceFile = require(file);
        new Modal(sourceFile.id, file);
    }
}

module.exports = loadModals;