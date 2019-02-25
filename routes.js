const express = require('express');
const router = express.Router();
const User = require('./models').User;
const Food = require('./models').Food;
// const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

// get all foods
router.get('/foods', (req,res) => {
    Food.findAll({})
    .then(foods => res.json(foods));

});

// get food by id
router.get('/foods/:id', (req,res) => {
    Food.findById(req.params.id)
        .then(food => {
            res.json(food);
        });
});

// edit food
router.put('/foods/:id', (req,res) => {
    Food.findById(req.params.id)
        .then(food => {
            return food.update(req.body);
        })
        .then(res.end());
});

// add new food
router.post('/foods', (req,res) => {
    //change to user.createFood for user id field
    Food.create(req.body)
        .then((result) => {res.json(result.id)});
});

// delete food
router.delete('/foods/:id', (req,res) => {
    Food.findById(req.params.id).then(function(food){  
        if(food) {
            food.destroy();
            res.end();
        } else {
            res.send(404);
        }})
        .catch(function(error){
            res.send(500, error);
        });
});

module.exports = router;