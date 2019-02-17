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

app.get("/delete/:id", function(req, res, next){
    Food.findById(req.params.id).then(function(food){  
        if(food) {
            return food.destroy();
        } else {
            res.send(404);
        }})
        .catch(function(error){
            res.send(500, error);
        });
});
const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));