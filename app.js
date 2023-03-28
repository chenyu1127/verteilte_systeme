"use strict";

import Database from "./database.js";
import { MusicEntity, createDemoMusic } from "./entity.js";
import Router from "./router.js";
class App {
    constructor() {
        this.database = new Database();
        this.router = new Router([
            {
                url: "^/$",
                show: () => this._gotoList()
            },{
                url: "^/new/$",
                show: () => this._gotoNew()
            },{
                url: "^/edit/(.*)$",
                show: matches => this._gotoEdit(matches[1]),
            },{
                url: ".*",
                show: () => this._gotoList()
            },
        ]);

        this._documentTitle = document.title;
        this._pageCssElement = document.querySelector("#page-css");
        this._bodyElement = document.querySelector("body");
        this._menuElement = document.querySelector("#app-menu");
    }


    async init() {
        await this.database.init();
        await this.database.createCollection("music", MusicEntity);
        createDemoMusic(this.database.music);
        this.router.start();
    }
    async _gotoList() {
        try {
            let {default: PageList} = await import("./page-list/page-list.js");

            let page = new PageList(this);
            await page.init();
            this._showPage(page, "list");
        } catch (ex) {
            this.showException(ex);
        }
    }
    async _gotoNew() {
        try {
            let {default: PageEdit} = await import("./page-edit/page-edit.js");

            let page = new PageEdit(this);
            await page.init();
            this._showPage(page, "new");
        } catch (ex) {
            this.showException(ex);
        }
    }
    async _gotoEdit(id) {
        try {
            let {default: PageEdit} = await import("./page-edit/page-edit.js");

            let page = new PageEdit(this, id);
            await page.init();
            this._showPage(page, "edit");
        } catch (ex) {
            this.showException(ex);
        }
    }
    _showPage(page, name) {

        document.title = `${this._documentTitle} – ${page.title}`;

        this._pageCssElement.innerHTML = page.css;
        this._menuElement.querySelectorAll("li").forEach(li => li.classList.remove("active"));
        this._menuElement.querySelectorAll(`li[data-page-name="${name}"]`).forEach(li => li.classList.add("active"));

        this._bodyElement.querySelector("main")?.remove();
        this._bodyElement.appendChild(page.mainElement);
    }
    showException(ex) {
        console.error(ex);
        alert(ex.toString());
    }
}
window.addEventListener("load", async () => {
    let app = new App();
    await app.init();
});
