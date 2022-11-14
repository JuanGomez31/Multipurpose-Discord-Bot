'use strict'
const {readdirSync: files, statSync} = require("fs");
const path = require("path");
let javaScriptExtension = ".js";
let slash = '/';
let goBackToSrcDirectory = "../../";

class Files {

    static getAllFiles(dirPath, arrayOfFiles = []) {
        for(let file of files(dirPath)) {
            if(this.#isDirectory(dirPath, file)) {
                arrayOfFiles = this.getAllFiles(dirPath + slash + file, arrayOfFiles);
            } else {
                if(this.#isJavaScript(file)) {
                    arrayOfFiles.push(path.join(__dirname, goBackToSrcDirectory , dirPath ,file));
                }
            }
        }
        return arrayOfFiles;
    }

    static getAllDirectoriesOfRoute(dirPath, arrayOfFiles = []) {
        for(let file of files(dirPath)) {
            if(this.#isDirectory(dirPath, file)) {
                arrayOfFiles.push(path.join(__dirname, goBackToSrcDirectory , dirPath, file))
            }
        }
        return arrayOfFiles;
    }

    static getParentDirectoryName(file) {
        return path.dirname(file).split(path.sep).pop();
    }

    static #isDirectory(dirPath, file) {
        return statSync(dirPath + slash + file).isDirectory();
    }

    static #isJavaScript(file) {
        return file.endsWith(javaScriptExtension);
    }


}

module.exports = Files;