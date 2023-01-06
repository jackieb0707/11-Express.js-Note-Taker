// dependencies 

const express = require('express');
const router = express.Router();

// will create a id that is random

const uid = require('uid');
// Database class object
const DB = require('../db/DB');

//routes that will get the notes
router.get('/api/notes', async function (req, res){
const notes = await DB.readNotes();
return res.json(notes);
});

// route for adding a new note, to add to json file
router.post("api/notes", async function (reg,res){
    const  currentNotes = await DB.readNotes();
    let newNote = {
        id: uid(),
        title: req.body.title,
        text: req.body.text,
    
    };
    await DB.addNote([...currentNotes,newNote]);

    return res.send(newNote);

});

// route that will delete notes

router.delete("/api/notes/:id" , async function (reg,res) {
    // this will separates out notes to delete based on id
    const noteToDelete = req.params.id;
    // notes that are already in the json file
    const currentNotes = await DB.readNotes();
    // will sort through the note files and create a new array minus the note in question
const newNoteData = currentNotes.filter((note)=> note.id !== noteToDelete);

//will send the new array back to the database class
await DB.deleteNote(newNoteData);

return res.send(newNoteData);
});

module.exports= router;

