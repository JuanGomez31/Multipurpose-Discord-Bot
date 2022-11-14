'use strict'
class SlashSubCommand {
    static #subCommands = [];

    constructor(name, command, data, group, file) {
        this.name = name;
        this.command = command;
        this.data = data;
        this.group = group;
        this.file = file;
        this.constructor.#subCommands.push(this);
    }

    getName() {
        return this.name;
    }

    getCommand() {
        return this.command;
    }

    getData() {
        return this.data;
    }

    getGroup() {
        return this.group;
    }

    getFile() {
        return this.file;
    }

    static getSubCommand(command, name, group) {
        return this.#subCommands.find(subCommand => subCommand.command === command && subCommand.name === name && subCommand.group === group)
    }

    static getSlashSubCommandsData() {
        let slashSubCommandsData = [];
        let readCommands = [];
        this.#subCommands.forEach(function(subCommand, key, map) {
            if(!readCommands.includes(subCommand.getCommand())) {
                readCommands.push(subCommand.getCommand());
                slashSubCommandsData.push(subCommand.getData())
            }
        })
        return slashSubCommandsData;
    }

}

module.exports = SlashSubCommand;