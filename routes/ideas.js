const express = require('express');
const router = express.Router();
const ideas = require('../ideasData');

//Get all ideas from the api
router.get('/', (req, res) => {       
    res.json({success: true, data: ideas});    
});

//Get a single idea from the api
router.get('/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id);

    if (!idea) {
        return res
        .status(404)
        .json({success: false, error: 'Idea not found'});   
    }

    res.json({success: true, data: idea});
});

module.exports = router;