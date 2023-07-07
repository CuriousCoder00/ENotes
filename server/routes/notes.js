const express = require('express');
const fetchuser = require('../middlewares/fetchuser');
const Note = require('../models/Note');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Fetch all the notes using: GET "auth/notes/fetchallnotes  
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error.");
    }
})

// Add a note to database with POST request at /auth/notes/:note_title and
router.post('/addnote', fetchuser, [
    body('title', 'Title must be of atleast 3 characters.').notEmpty().isLength({min:3}),
    body('description', 'Description must be of atleast 5 characters.').notEmpty().isLength({min:5})], async (req, res)=>{
    const {title, description, tag} = req.body;
    try{
        // If there are errors, return bad request and errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error.");
    }
})

// Update an existing note using: PUT "/auth/notes/updatenote/:id"
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    let id = req.params.id;
    const {title, description, tag} = req.body;
    try{
        // Create a newNote object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        // Find the note to be updated and update it
        let note = await Note.findById(id);
        if(!note){res.status(404).send("Not found.")}
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not allowed.");
        }
        note = await Note.findByIdAndUpdate(id,{$set:newNote}, {new : true});
        console.log("note is successfully updated");
        res.json({note});
        // res.redirect("/notes")
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error.");
    }
})

// Delete an existing Note using: DELETE "/api/notes/deletenote/:id"
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    let id = req.params.id;
    const {title, description, tag} = req.body;
    try{
        // Find the note to be deleted and delete it
        let note = await Note.findById(id);
        if(!note){res.status(404).send("Not found.")}
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not allowed.");
        }
        note = await Note.findByIdAndDelete(id);
        res.json({"Success": "Note has been deleted succcessfully.", note:note});
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error.");
    }
})


module.exports = router;