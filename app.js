const express = require('express');
const app = express();

const ejs = require('ejs');

const path = require('path');

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
// app.use(myLogger);
// app.use(myLogger2);

//ROUTES (path directory)
app.get('/', (req, res) => {
  //for static >> res.sendFile(path.resolve(__dirname, 'temp/index.html')); 
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});

const port = 3000;
app.listen(port, () => {
  console.log(`>>Server started at port ${port}`);
});

//get, post, put, patch, delete
//npm start (start with nodemon)
