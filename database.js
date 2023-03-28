"use strict";
export default class Database {
    constructor() {
        this._dbname = "music_local_database_new";
        this._collections = [];
        this._data = {};
    }
    async init() {
        let storage = JSON.parse(localStorage.getItem(this._dbname)) || {};

        if ("collections" in storage) {
            for (let collection of storage.collections) {
                this.createCollection(collection);
            }
        }

        if ("data" in storage) {
            this._data = storage.data;
        }
    }
    _updateLocalStorage() {
        localStorage.setItem(this._dbname, JSON.stringify({
            collections: this._collections,
            data: this._data,
        }));
    }
    async createCollection(name, config) {
        if (this._collections.indexOf(name) < 0) {
            this._collections.push(name);
        }

        if (!this._data.hasOwnProperty(name)) {
            this._data[name] = [];
        }
        
        this[name] = new Collection(this, name, config);
    }
    async deleteCollection(name) {
        if (this._collections.indexOf(name) >= 0) {
            this._collections = this._collections.filter(c => c.name !== name);
            delete this._data[name];
            delete this[name];
            this._updateLocalStorage();
        }
    }
};
class Collection {
    constructor(database, name, config) {
        this._database = database;
        this._name = name;
        this._config = config || {};
    }
    async findAll() {
        return this._database._data[this._name];
    }
    async findById(id) {
        let dataset = this._database._data[this._name].find(e => e.id == id);
        return Object.assign({}, dataset);
    }
    async save(dataset) {
        if (dataset.id) {
            this.delete(dataset.id);
        } else {
            dataset.id = 0;

            this._database._data[this._name].forEach(existing => {
                dataset.id = Math.max(dataset.id, existing.id);
            });

            dataset.id++;
        }

        this._database._data[this._name].push(dataset);

        if (this._config.hasOwnProperty("compare")) {
            this._database._data[this._name].sort(this._config.compare);
        }

        this._database._updateLocalStorage();
    }
}