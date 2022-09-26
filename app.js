const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`>>Server started at port ${port}`);
});

//get, post, put, patch, delete
//npm start (start with nodemon)
