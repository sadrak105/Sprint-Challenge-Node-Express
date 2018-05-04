const express = require('express');

const db = require('../data/helpers/projectModel');

const router = express.Router();

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