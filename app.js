const path = require('path');

const express = require('express');

const app = express();

const myLogger = (req, res, next) => {
  console.log('Middleware Log 1');
  next();
};
const myLogger2 = (req, res, next) => {
  console.log('Middleware Log 2');
  next();
};

//MIDDLEWARES (between of the req and res)
app.use(express.static('public'));
app.use(myLogger);
app.use(myLogger2);

//path directory
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html')); 
});

const port = 3000;
app.listen(port, () => {
  console.log(`>>Server started at port ${port}`);
});

//get, post, put, patch, delete
//npm start (start with nodemon)
