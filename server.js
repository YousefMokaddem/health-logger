const express = require('express');
const Food = require('./models').foods;
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/all', (req,res) => {
    Food.findAll()
        .then(books => {
            res.json(books);
        });
});

app.post('/add', (req,res) => {
    Food.create(req.body)
        .then(() => {res.redirect(`/foods`)});
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));