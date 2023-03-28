"use strict";
export class MusicEntity {

    static createNew() {
        return {
            id: -1,
            title: "",
            singer: "",
            album: "",
            duration: "",  
            audio: "",
            image: "<img src=../img/interpret.png>" ,
        }
    }
    static validate(music) {
        if (!music.hasOwnProperty("title") || !music.title) {
            throw "Geben Sie erst einen Songtitel ein.";
        }

        if (!music.hasOwnProperty("singer") || !music.singer) {
            throw "Geben Sie erst einen Sänger ein.";
        }
    }
}
export async function createDemoMusic(musicCollection) {
    let existingData = await musicCollection.findAll();

    if (existingData.length == 0) {
        musicCollection.save({
            title: "Blinding Lights",
            singer: "The Weeknd",
            album: "Blinding Lights",
            duration: "4:23",
            audio: "../audio/weeknd.mp3",
            image: "<img src=../img/weeknd.png>",
        });

        musicCollection.save({
            title: "Bad Habit",
            singer: "Steve Lacy",
            album: "Gemini Rights",
            duration: "3:52",
            audio: "../audio/steve.mp3",
            image: "<img src=../img/steve.jpg>",

        });

        musicCollection.save({
            title: "Anti-Hero",
            singer: "Taylor Swift",
            album: "Midnight",
            duration: "2:57",
            audio: "../audio/taylor.mp3",
            image: "<img src=../img/taylor.png>",

        });

        musicCollection.save({
            title: "As It Was",
            singer: "Harry Styles",
            album: "Harry's House",
            duration: "2:59",
            audio: "../audio/harry.mp3",
            image: "<img src=../img/harry.png>",

        });

        musicCollection.save({
            title: "Rich Flex",
            singer: "Drake & 21 Savage",
            album: "Her Loss",
            duration: "3:25",
            audio: "../audio/drake.mp3",
            image: "<img src=../img/drake.jpg>",

        });
    }
}