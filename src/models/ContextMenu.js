'use strict'

class ContextMenu {
    static #contextMenusByName = new Map();

    constructor(name, data, file) {
        this.name = name;
        this.data = data;
        this.file = file;
        this.constructor.#contextMenusByName.set(this.name, this);
    }

    getName() {
        return this.name;
    }

    getData() {
        return this.data;
    }

    getFile() {
        return this.file;
    }

    static getContextMenuByName(name) {
        return this.#contextMenusByName.get(name);
    }

    static getContextMenusData() {
        let slashCommandsData = [];
        this.#contextMenusByName.forEach(function(contextMenu, key, map) {
            if (contextMenu.getData())  {
                slashCommandsData.push(contextMenu.getData())
            }
        })
        return slashCommandsData;
    }


}

module.exports = ContextMenu;