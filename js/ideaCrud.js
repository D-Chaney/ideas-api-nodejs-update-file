//Dependencies/modules
const fs = require('fs/promises');
const path = require('path');
const ideas = require('../database/ideasData');

function addPostToFile(idea, type) {

    const { text, tag, username } = idea;

    // Check if all necessary fields are present
    if (!text || !tag || !username) {
        return res.status(400).json({ message: 'Text, Tag and Username are required fields' });
    }

    if(type === 'post') {
        ideas.push(idea);
    } else if(type === 'put') {
        const index = ideas.findIndex((idea) => idea.id === +idea.id);
        ideas[index] = idea;
    }

    writeIdeaFile(idea)
}

async function writeIdeaFile(idea) {    
    try {
        // Update the file with the new array of ideas using async/await
        await fs.writeFile(path.join(__dirname, '../database/ideasData.js'), generateFileContent(ideas), 'utf8');
        
        // Send a success response
        res.status(201).json({ message: 'Idea added successfully', idea: idea });
    } catch (error) {        
        return res.status(500).json({ message: 'Failed to update ideas file', error: error });
    }
    
}

 // Function to generate the updated file content
 function generateFileContent(ideasArray) {
    return `const ideas = ${JSON.stringify(ideasArray, null, 4)};\n\nmodule.exports = ideas;`;
}

module.exports = addPostToFile;


