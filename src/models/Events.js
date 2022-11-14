'use strict'

class Events {

    static runEventFiles(bot, events) {
        for(let file of events) {
            let event = require(file);
            if(event.once) {
                this.#executeOnce(bot, event);
            } else {
                this.#execute(bot, event);
            }
        }
    }

    static #executeOnce(bot, file) {
        bot.once(file.name, (...args) => file.run(...args, bot));
    }

    static #execute(bot, file) {
        bot.on(file.name, (...args) => file.run(...args, bot));
    }

}

module.exports = Events;