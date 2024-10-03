//Dependencies/modules
const express = require('express');
const router = express.Router();
const ideas = require('../database/ideasData');
const { addPostToFile, deleteAllIdeas } = require('../js/ideaCrud');
const {v4: uuidv4} = require('uuid');

/****ALL GET REQUESTS ROUTING ****************************************************
*************************************************************************/

//Get all ideas from the api
router.get('/ideas', (req, res) => {   
    if (ideas.length === 0) {        
        console.log("Ideas Failed length",ideas.length)
        return res
        .status(200)
        .json({success: false, error: 'No Ideas at this time'});   
    }else {
        return res.json({success: true, data: ideas});
    }
       
});

//Get a single idea from the api
router.get('/ideas/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id);

    if (ideas.length === 0) {

        console.log("Ideas Failed length",ideas.length)
        return res
        .status(404)
        .json({success: false, error: 'No ideas found'});   
    }else if (!idea) {
        return res
        .status(404)
        .json({success: false, error: 'Idea not found'});   
    }else {

        return res.json({success: true, data: idea});
    }
});

/****ALL POST REQUESTS ROUTING ****************************************************
*************************************************************************/

router.post('/ideas', async(req, res) => {
    const idea = {
        id: ideas.length + 1,
        uuid: uuidv4(),
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
        date: new Date().toLocaleString().slice(0, 10),
        timestamp: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })

    };

    const result = await addPostToFile(idea, 'post');

    if (result.success) {
         result.message = 'Post added successfully';
        return res.status(201).json(result);
    } else {
        return res.status(500).json(result);
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
        result.message = `Idea id:${idea.id} modified successfully`;
        return res.json(result);
    } else {
        return res.status(500).json(result);
    }
});

/****ALL DELETE REQUESTS ROUTING ****************************************************
*************************************************************************/

//Delete all ideas from the api/DEVELOPEMENT TESTING ONLY!!!!!!!!!
router.delete('/ideas/deleteall/:passcode', async(req, res) => {  

    //const result = await deleteAllIdeas();
    if(req.params.passcode === '123456') {
        var result = await deleteAllIdeas();
    } else {
         return res.status(401).json({success: false, message: 'passcode incorrect'});
     }    

    if (result.success) {
        result.message = `deleted All Ideas successfully`;
        return res.json(result);
    } else {
        return res.status(500).json(result);
    }
});

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
        result.message = `Idea id:${idea.id} deleted successfully`;
        return res.json(result);
    } else {
        return res.status(500).json(result);
    }
});

//Export the routes to server.js, ***DO NOT DELETE***
module.exports = router;