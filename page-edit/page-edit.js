"use strict";

import Page from "../page.js";
import {MusicEntity} from "../entity.js";

export default class PageEdit extends Page {
    constructor(app, editId) {
        super(app, "page-edit/page-edit.html");
        this._editId = editId;
        this._dataset = MusicEntity.createNew();
        this._titleInput = null;
        this._singerInput  = null;
        this._albumInput     = null;
        this._durationInput     = null;
        this._audiotInput     = null;
    }
    async init() {
  
        await super.init();
        if (this._editId) {
            this._dataset = await this._app.database.music.findById(this._editId);
            this._title = `${this._dataset.title} ${this._dataset.singer}`;
        } else {
            this._title = "Musik speichern";
        }
        let html = this._mainElement.innerHTML;
        html = html.replace("$SINGER$", this._dataset.singer);
        html = html.replace("$TITLE$", this._dataset.title);
        html = html.replace("$ALBUM$", this._dataset.album);
        html = html.replace("$DURATION$", this._dataset.duration);
        html = html.replace("$AUDIO$", this._dataset.audio);
        this._mainElement.innerHTML = html;

        let saveButton = this._mainElement.querySelector(".action.save");
        saveButton.addEventListener("click", () => this._saveAndExit());

        this._titleInput = this._mainElement.querySelector("input.title");
        this._singerInput  = this._mainElement.querySelector("input.singer");
        this._albumInput     = this._mainElement.querySelector("input.album");
        this._durationInput     = this._mainElement.querySelector("input.duration");
        this._audiotInput     = this._mainElement.querySelector("input.audio");
    }
    async _saveAndExit() {
        this._dataset.id        = this._editId;
        this._dataset.title = this._titleInput.value.trim();
        this._dataset.singer  = this._singerInput.value.trim();
        this._dataset.album     = this._albumInput.value.trim();
        this._dataset.duration     = this._durationInput.value.trim();
        this._dataset.audio     = this._audiotInput.value.trim();

        try {
            MusicEntity.validate(this._dataset);
        } catch (ex) {
            this._app.showException(ex);
            return;
        }
        await this._app.database.music.save(this._dataset);
        location.hash = "#/";
    }
};
