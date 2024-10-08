//brings in the express module
const express = require('express');
const app = express();

//brings in the dotenv module to access the.env file
require('dotenv').config();
const port = process.env.PORT;

//Body Parser Middleware - allows us to access the body of the request(POST, PUT, DELETE)
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Brings in the ideas routes from the routes directory
const ideasRouter = require('./routes/ideas');
app.use('/api/v1',ideasRouter);



/*****HOW TO INCLUDE CORS**************************************************************
 ***************************************************************************************/
//const cors = require('cors');

/***** DEFINE CORS OPTIONS *******/
// const corsOptions = {
//   origin: 'http://localhost', // Or use '*' for any domain
//   methods: 'GET, POST',
//   credentials: true
// };

/****Apply CORS middleware only to the /api/ideas route *****/ 
//app.use('/api/ideas', cors(corsOptions), ideasRouter);





























































































































































































































































































































































































































































































































































































































app.get('/', (req, res) => {
    res.send({message: 'Hello World!'});
});

//Get all ideas
app.get('/api/ideas', (req, res) => {
    res.send({success: true, data: ideas});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


































































































































































































































































































































































































































































































































































































































