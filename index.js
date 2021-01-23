var express = require("express");         
var app = express();                        

const bodyParser = require('body-parser');   
app.use(bodyParser.urlencoded({ extended: true }));        
app.use(bodyParser.json());                 

const server = require('./server');            
const middleware = require("./middleware");         
const err = "404 Page Not Found"
const MongoClient = require('mongodb').MongoClient;         
const url = 'mongodb://localhost:27017';            
const dbName = 'chatbot';          
let db;                                             
MongoClient.connect(url, (err, client) => {     
    if (err) return console.log(err);           
    db = client.db(dbName);                     
    console.log(`Connected Database: ${url}`);      
    console.log(`Database: ${dbName}`);         
});

  

app.post('/luckyDrawDetails',middleware.checkToken, function (req, res) {      
    let number = req.body.number;
    console.log(number); 
    var n = {number:new RegExp(number)};
    db.collection('details', function (err, collection) {
        collection.find(n).toArray(function (err, items) {
            if(err) throw err;
            console.log("Displaying...");
            res.send(items);
            res.end();
        });
    });
});

app.listen(8080);