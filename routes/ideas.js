//Dependencies/modules
const express = require('express');
const router = express.Router();
const ideas = require('../database/ideasData');
const addPostToFile = require('../js/ideaCrud');


/****ALL GET REQUESTS ROUTING ****************************************************
*************************************************************************/

//Get all ideas from the api
router.get('/ideas', (req, res) => {       
    res.json({success: true, data: ideas});    
});

//Get a single idea from the api
router.get('/ideas/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id);

    if (!idea) {
        return res
        .status(404)
        .json({success: false, error: 'Idea not found'});   
    }

    res.json({success: true, data: idea});
});


/****ALL POST REQUESTS ROUTING ****************************************************
*************************************************************************/

router.post('/ideas', (req, res) => {
    const idea = {
        id: ideas.length + 1,
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
        date: new Date().toLocaleString().slice(0, 10),
    };

    addPostToFile(idea, 'post');

    res.send({success: true, data: idea});
});

/****ALL PUT REQUESTS ROUTING ****************************************************
*************************************************************************/

//Modify an existing idea in the api
router.put('/ideas/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id);

    if (!idea) {
        return res
        .status(404)
        .json({success: false, error: 'Idea not found'});   
    }

    idea.text = req.body.text || idea.text;
    idea.tag = req.body.tag || idea.tag;
    idea.date = new Date().toLocaleString().slice(0, 10);    

    addPostToFile(idea,'put');

    res.json({success: true, data: idea});
});


//Export the routes to server.js, ***DO NOT DELETE***
module.exports = router;