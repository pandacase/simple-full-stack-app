
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));


// create
app.post('/insert', (request, response) => {
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewName(name);
    result
});

// get
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data})) 
    .catch(err => console.log(err)); // callback func: if response is rejected by client...
});


// update
app.patch('/update', (request, response) => {

})


// delete
app.delete('delete/:id', (request, response) => {
    
})


// search



// run the app
app.listen(process.env.PORT, () => console.log('App is running'));