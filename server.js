const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.get('/all', (req,res)=>{

    //open database
    let db = new sqlite3.Database('./foods.db', (err) => {
        if (err) {
        return console.error(err.message);
        }
        console.log('Connected to the SQlite database.');
    });
    
    //run query
    let sql = `SELECT * FROM foods;`
    db.all(sql, (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        res.json(row);
    });

    //close database
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Closed the database connection.');
    });
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));