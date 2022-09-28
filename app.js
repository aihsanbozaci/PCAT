const express = require('express');
const app = express();
//connect MongoDB with Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const ejs = require('ejs');

const path = require('path');

const Photo = require('./models/Photo');
//TEMPLATE ENGINE
app.set('view engine', 'ejs');

/*
const myLogger = (req, res, next) => {
  console.log('Middleware Log 1');
  next();
};
const myLogger2 = (req, res, next) => {
  console.log('Middleware Log 2');
  next();
}; 
*/

//MIDDLEWARES (between of the req and res)
app.use(express.static('public'));
app.use(express.urlencoded({extended : true})); //response form (reading url data)
app.use(express.json());                        //converting data to json file to read


//ROUTES (path directory)
app.get('/', async(req, res) => {
  const photos = await Photo.find({})
  res.render('index', {
    photos
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/photos', async(req, res) => {
  //console.log(req.body);
  await Photo.create(req.body);
  res.redirect('/');
});



const port = 3000;
app.listen(port, () => {
  console.log(`>>Server started at port ${port}`);
});

//get, post, put, patch, delete
//npm start (start with nodemon)
