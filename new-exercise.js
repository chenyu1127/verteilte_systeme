//importieren der benötigten Module 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//initialisieren express-app
const app = express();

//Verbindung zu MongoDB-Datenbank
mongoose.connect('mongodb://localhost/eigengewichts-uebungen', 
                {useNewUrlParser: true});

//Definition des Datenmodells für Übungen
const uebungSchema = new mongoose.Schema({
    name: {type: String, required: true},
    beschreibung: {type: String, required: true},
    schwerpunkt: {type: String, required: true},
    sets: {type: Number},
    zeit: {type: Number},
});

//Erstellen des Models basierend auf dem Schema
const Uebung = mongoose.model('Uebung', uebungSchema);

//Middleware für das Parsen von JSON-Daten
app.use(bodyParser.json());

//Routen für die CRUD-Operationen
app.get('/uebungen', async(req,res) =>{
    const uebungen = await Uebung.find();
    res.json(uebungen);
});

app.post('/uebungen', async(req,res) =>{
    const uebung = new Uebung(req.body);
    await uebung.save();
    res.json(uebung);
})

app.put('/uebungen/:id', async(req,res)=>{
    const {id} = req.params;
    const uebung = await Uebung.findByIdAndUpdate(id, req.body, {
        new: true
    });
    res.json(uebung);
});


app.delete('/uebungen/:id', async(req,res)=>{
    const {id} = req.params;
    await Uebung.findByIdAndDelete(id);
    res.json({message:'Übung gelöscht'});
});

//Routen für den Workoutplan
let wochenplan = [];

app.get('/wochenplan', async(req, res)=>{
    res.json(wochenplan);
});

app.post('/wochenplan', async(req, res)=>{
    const {uebungId, sets, zeit} = req.body;
    const uebung = await Uebung.findById(uebungId);
    const eintrag = {uebung, sets, zeit};
    wochenplan.push(eintrag);
    res.json(eintrag);
});

app.delete('/wochenplan', async(req, res)=>{
    const index = req.query.index;
    wochenplan.splice(index, 1);
    res.json({message: 'Eintrag aus dem Wochenplan entfernt'});
});


//Starten des Servers
app.listen(3000,()=>{
    console.log("Server gestartet auf Port 3000");
});