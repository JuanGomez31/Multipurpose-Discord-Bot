'use strict'
class SlashCommand {
    static #commandsByName = new Map();

    constructor(name, data, category, file) {
        this.name = name;
        this.data = data;
        this.category = category;
        this.file = file;
        this.constructor.#commandsByName.set(this.name, this);
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

    static getCommandByName(name) {
        return this.#commandsByName.get(name);
    }

    static getSlashCommandsData() {
        let slashCommandsData = [];
        this.#commandsByName.forEach(function(command, key, map) {
            if (command.getData())  {
                slashCommandsData.push(command.getData())
            }
        })
        return slashCommandsData;
    }

}

module.exports = SlashCommand;