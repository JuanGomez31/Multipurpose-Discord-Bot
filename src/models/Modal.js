'use strict'
class Modal {
    static #modelsByID = new Map();

    constructor(id, file) {
        this.id = id;
        this.file = file;
        this.constructor.#modelsByID.set(this.id, this);
    }

    getID() {
        return this.id;
    }

    getModal() {
        return this.file.getModal();
    }

    getFile() {
        return this.file;
    }

    static getModalByID(modalID) {
        return this.#modelsByID.get(modalID);
    }

}

module.exports = Modal;