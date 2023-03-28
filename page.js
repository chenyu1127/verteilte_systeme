"use strict";
export default class Page {
    constructor(app, htmlFile) {
        this._app = app;

        this._htmlFile = htmlFile;
        this._title = "???";
        this._cssString = null;
        this._mainElement = null;
    }
    async init() {
        let response = await fetch(this._htmlFile);

        if (!response.ok) {
            throw `HTTP ${response.status}: ${await response.text()}`;
        }

        let htmlString = await response.text();
        let dummyElement = document.createElement("div");
        dummyElement.innerHTML = htmlString;

        this._cssString = dummyElement.querySelector("style")?.innerHTML;
        this._mainElement = dummyElement.querySelector("main");
        this._mainElement.remove();
    }
    get title() {
        return this._title;
    }
    get css() {
        return this._cssString;
    }
    get mainElement() {
        return this._mainElement;
    }
}
