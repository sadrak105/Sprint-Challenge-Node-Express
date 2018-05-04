const express = require('express');

const db = require('../data/helpers/projectModel');

const router = express.Router();

//=================Post=================
router.post('/', (req, res) => {
    const { name, description } = req.body;
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
router.put('/:id', (req, res) => {
    const { name, description } = req.body;
    const project = req.body;

    db
    .update(req.params.id, project)
    .then(resource => {
        if (resource === null) {
            res.status(400).json({ error:"No project found!" })
        }
        else {
            db
            .get(req.params.id)
            .then(project => {
                res.status(200).json(project)
            })
            .catch(err => {
                res.status(500).json({ error:"Error Updating!"})
            })
        }
    })
    .catch(err => {
        res.status(500).json({ error:"Could Not Update!"})
    })
})

//===================DELETE=======================
router.delete('/:id', (req, res) => {
    db
    .get(req.params.id)
    .then(response => {
        db
        .remove(req.params.id)
        .then(response => {
            if(response === 0){
                res.status(400).json({ error:"Error Deleting Project!" })
            } else {
                res.status(200).json(response)
            }
        })
        .catch(err => {
            res.status(500).json({ error:"Delete Error!" })
        })
    })
})

module.exports = router;