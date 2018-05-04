const express = require('express');

const db = require('../data/helpers/actionModel');

const router = express.Router();

//=================POST====================
router.post('/', (req, res) =>{
    const { project_id, description, notes } = req.body;
    const newAction = req.body

    if (!newAction.project_id || !newAction.description){
        res.status(400).json({ error:"Required Fields!"})
    }
    if (newAction.description.length > 128){
        res.status(400).json({ error:"Has To Be Less Than 128 Characters" })
    }
    else {
        db
        .insert(newAction)
        .then(actions => {
            res.status(201).json(actions)
        })
    }
})

//=============GET==================
router.get('/', (req, res) => {
    db
    .get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        res.status(500).json({ error:"Error Getting Actions" })
    })
})

//=======GET BY ID==========
router.get('/:id', (req, res) => {
    db
    .get(req.params.id)
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        res.status(500).json({ error:"Error Getting Actions By Id" })
    })
})



module.exports = router;