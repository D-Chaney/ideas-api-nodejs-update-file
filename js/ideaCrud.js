//Dependencies/modules
const fs = require('fs/promises');
const path = require('path');
const ideas = require('../database/ideasData');

async function addPostToFile(idea, type) {

    const { text, tag, username } = idea;


    if(type === 'post') {
         // Check if all necessary fields are present
        if (!text || !tag || !username) {
            return res.status(400).json({ message: 'Text, Tag and Username are required fields' });
        }

        ideas.push(idea);
    } else if(type === 'put') {

         // Check if all necessary fields are present
         if (!text || !tag) {
            return res.status(400).json({ message: 'Text and Tagare required fields' });
        }

        const index = ideas.findIndex((item) => item.id === +idea.id);
        ideas[index] = idea;

    } else if (type === 'delete') {
        const index = ideas.findIndex((item) => item.id === +idea.id);
        ideas.splice(index, 1);
    }

    const result = await writeIdeaFile(ideas, idea);
    return result;
}

async function deleteAllIdeas() {
    try{
        await fs.writeFile(path.join(__dirname,'../database/ideasData.js'), generateFileContent([]), 'utf8');
        return { success: true, message: 'success' };
    } catch (err) {
        return { success: false, error: 'Failed to update ideas file' };    
    }
}   

async function writeIdeaFile(ideasArray, idea) {    
    try {
        // Update the file with the new array of ideas using async/await
        await fs.writeFile(path.join(__dirname, '../database/ideasData.js'), generateFileContent(ideasArray), 'utf8');
        
        // Send a success response
        return { success: true, message: 'success',data: idea };
    } catch (error) {        
        return { success: false, error: 'Failed to update ideas file' };
    }
    
}

 // Function to generate the updated file content
 function generateFileContent(ideasArray) {
    return `const ideas = ${JSON.stringify(ideasArray, null, 4)};\n\nmodule.exports = ideas;`;
}

module.exports = { addPostToFile, deleteAllIdeas };
