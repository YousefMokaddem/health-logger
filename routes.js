const express = require('express');
const router = express.Router();
const User = require('./models').User;
const Food = require('./models').Food;
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

const authenticateUser = async (req,res,next) => {

    let message = null;

    //parse user credentials from auth header
    const credentials = auth(req);

    //if the credentials are available
    if(credentials){
        //find the user by their email address (the 'key' from the auth header)
        
        let user = await User.find({where:{email: credentials.name}});
        //if the user was retrieved...
        if(user){
            //check the password
            const authenticated = bcryptjs
                .compareSync(credentials.pass, user.password);
            //if the passwords match...
            if(authenticated){
                req.currentUser = user;
            }else{
                message = `Authentication failure for username: ${user.email}`;
            }
        }else{
            message = `User not found: ${credentials.name}`;
        }
    }else{
        message = `Authentication header not found`
    }

    //if authentication failed
    if(message){
        console.warn(message);

        //return 401 unauthorized
        res.status(401).json({message: 'Access Denied'});
    }else{
        //successful authentication passes control to the route handler
        next();
    }
}

// create new user
router.post('/users', (req,res,next) => {
    const user = new User(req.body);
    // hash the user's password
    user.password = bcryptjs.hashSync(user.password);

    // validate email
    if(!/^[^@]+@[^@.]+\.[a-z]+$/i.test(user.email)){
        let err = new Error("Bad Request - invalid email");
        err.status = 400;
        return next(err)
    };

    // check email against database to ensure it isn't already in use
    User.find({where: {email: user.email}})
        .then((userfound) => {
            if (userfound !== null){
                //email is already in use
                err = new Error("Conflict - email in use");
                err.status = 409;
                return next(err);
            }else{
                user.save()
                .then(() => {
                    res.status(201);
                    res.end();
                })
                .catch((err) => {
                    return next(err);
                });
            }
        });
});

// view currently authenticated user
router.get('/users', authenticateUser, (req, res) => {
    const user = req.currentUser;
    res.json({
        email: user.email
    });
});

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
router.put('/foods/:id', authenticateUser, (req,res) => {
    Food.findById(req.params.id)
        .then(food => {
            if(req.currentUser.id === food.userId){
                return food.update(req.body);
            }else{
                const err = new Error("Access Denied");
                err.status = 401;
                return next(err);
            }
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