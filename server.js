const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const routes = require('./routes');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/* testing stuff */
const User = require('./models').User;
const Food = require('./models').Food;
// User.create({
//     email: 'joe@joe.com',
//     password: 'joe'
// }).then(user => {
//     user.createFood({
//         name: 'banana',
//         calories: 1,
//         fat: 2,
//         carbs: 3,
//         protein: 4,
//         img: 'https://images-na.ssl-images-amazon.com/images/I/71gI-IUNUkL._SY355_.jpg'
//     }).then(console.log('worked'));
// });


// //return all foods
// app.get('/', (req,res) => {
//     User.findAll({
//         include: [Food]
//     })
//     .then(user => {
//         console.log(user);
//         res.json(user);
//     })
// });
/* testing stuff */


app.use('/api', routes);






// //get all foods
// app.get('/all', (req,res) => {
//     Food.findAll()
//         .then(foods => {
//             res.json(foods);
//         });
// });

// //get food
// app.get('/byId/:id', (req,res) => {
//     console.log('getting');
//     Food.findById(req.params.id)
//         .then(food => {
//             res.json(food);
//         });
// });

// //edit food
// app.put('/byId/:id', (req,res) => {
//     Food.findById(req.params.id)
//         .then(food => {
//             return food.update(req.body);
//         })
//         .then(res.end());
// });

// //add new food
// app.post('/add', (req,res) => {
//     Food.create(req.body)
//         .then((result) => {res.json(result.id)});
// });

// //delete food
// app.delete("/delete/:id", function(req, res, next){
//     Food.findById(req.params.id).then(function(food){  
//         if(food) {
//             food.destroy();
//             res.end();
//         } else {
//             res.send(404);
//         }})
//         .catch(function(error){
//             res.send(500, error);
//         });
// });
const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));