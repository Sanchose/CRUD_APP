const express = require('express');
const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser')
const cors = require('cors')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "cruddatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get', (req, res) =>{
    const sqlSelect = "SELECT * FROM movies";
    db.query(sqlSelect, (err, result) => {
    res.send(result)
    });
});

app.post('/api/insert' , (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = 
    "INSERT INTO movies (Movie_name, Movie_review) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) =>{
        console.log(result);
    });
});

app.listen(3001, () => {
    console.log('running 3001');
});