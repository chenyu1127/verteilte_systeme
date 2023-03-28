"use strict";

import Page from "../page.js";

export default class PageList extends Page {

    constructor(app) {
        super(app, "page-list/page-list.html");

        this._emptyMessageElement = null;
    }

    async init() {
 
        await super.init();
        this._title = "Bibliothek";
        let data = await this._app.database.music.findAll();
        this._emptyMessageElement = this._mainElement.querySelector(".empty-placeholder");

        if (data.length) {
            this._emptyMessageElement.classList.add("hidden");
        }
        let olElement = this._mainElement.querySelector("ol");

        let templateElement = this._mainElement.querySelector(".list-entry");
        let templateHtml = templateElement.outerHTML;
        templateElement.remove();

        for (let index in data) {
            let dataset = data[index];
            let html = templateHtml;
            html = html.replace("$ID$", dataset.id);
            html = html.replace("$SINGER$", dataset.singer);
            html = html.replace("$TITLE$", dataset.title);
            html = html.replace("$ALBUM$", dataset.album);
            html = html.replace("$DURATION$", dataset.duration);
            html = html.replace("$AUDIO$", dataset.audio);
            html = html.replace("$IMAGE$", dataset.image)
            let dummyElement = document.createElement("div");
            dummyElement.innerHTML = html;
            let liElement = dummyElement.firstElementChild;
            liElement.remove();
            olElement.appendChild(liElement);
            liElement.querySelector(".action.play").addEventListener("click", () => this._play(dataset.id));
        }
    }
    async _play(id){
        let data = await this._app.database.music.findAll();
        let icon = document.getElementById("playbtn");
        let dataset  = data[id-1] ;
        let audio = dataset.audio;
        let a= new Audio(audio);
        a.play();
    }
};
