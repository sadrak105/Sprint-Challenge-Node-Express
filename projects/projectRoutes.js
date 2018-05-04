const express = require('express');

const db = require('../data/helpers/projectModel');

const router = express.Router();

//=================Post=================
router.post('/', (req, res) => {
    const { name, description, completed } = req.body;
    const project = req.body;
    if (!project.name || !project.description){
        res.status(400).json({ error:"Needed fields!"})
    } 
    if (project.description.length > 128 || project.name.length > 128){
        res.status(400).json({ error:"Needs to be less than 128 characters!"})
    }
    else {
    db
    .insert(project)
    .then(projects => {
        res.status(201).json(projects);
    })
    .catch(err => {
        res.status(500).json({ error:"error" })
    })
}
})

//===================GET================
router.get('/', (req, res) => {
    db
    .get()
    .then(projects => {
        res.json(projects);
    })
    .catch(err => {
        res.status(500).json({ error:"The projects information could not load." })
    })
})

router.get('/:id', (req,res) => {

    db
    .get(req.params.id)
    .then(projects => {
            res.status(200).json(projects);
    })
    .catch(err => {
        res.status(500).json({error: "The project information could not be retrieved."})
    })
});

//==================PUT====================



module.exports = router;