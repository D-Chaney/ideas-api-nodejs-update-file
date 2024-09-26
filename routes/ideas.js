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

router.post('/ideas', async(req, res) => {
    const idea = {
        id: ideas.length + 1,
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
        date: new Date().toLocaleString().slice(0, 10),
        timestamp: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })

    };

    const result = await addPostToFile(idea, 'post');

    if (result.success) {
         result.message = 'Post added successfully';
        res.status(201).json(result);
    } else {
        res.status(500).json(result);
    }
});

/****ALL PUT REQUESTS ROUTING ****************************************************
*************************************************************************/

//Modify an existing idea in the api
router.put('/ideas/:id', async(req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id);

    if (!idea) {
        return res
        .status(404)
        .json({success: false, error: 'Idea not found'});   
    }

    idea.text = req.body.text || idea.text;
    idea.tag = req.body.tag || idea.tag;
    idea.date = new Date().toLocaleString().slice(0, 10);  
    idea.timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })

    const result = await addPostToFile(idea,'put');

    if (result.success) {
        result.message = `Post id:${idea.id} modified successfully`;
        res.json(result);
    } else {
        res.status(500).json(result);
    }
});

/****ALL DELETE REQUESTS ROUTING ****************************************************
*************************************************************************/

//Delete an existing idea from the api
router.delete('/ideas/:id', async(req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id);

    if (!idea) {
        return res
        .status(404)
        .json({success: false, error: 'Idea not found'});   
    }

    const result = await addPostToFile(idea, 'delete');

    if (result.success) {
        result.message = `Post id:${idea.id} deleted successfully`;
        res.json(result);
    } else {
        res.status(500).json(result);
    }
});


//Export the routes to server.js, ***DO NOT DELETE***
module.exports = router;