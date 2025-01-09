const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./groceries.db');

const express = require('express');
const server = express();

server.use(express.json()).use(express.urlencoded({extended: false })).use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');

    next();
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

server.get('/groceries', (req, res) => {
    const sql = 'SELECT * FROM groceries';

    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows);
        }
    })
});

server.post('/groceries', (req, res) => {
    const grocery = req.body;
    const sql = `INSERT INTO groceries(groceryType, amount, brand, groceryCategory, note) VALUES (?,?,?,?,?)`;

    db.run(sql, Object.values(grocery), (err) => {
        if(err) {
        console.log(err);
        res.status(500).send(err);
    } else {
        res.send('Användaren sparades');
    }
    });
});