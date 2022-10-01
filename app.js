const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override"); //OVERRIDE Methods must be defined at middlewares
const ejs = require("ejs");
const photoController = require("./controllers/photoControllers");
const pageController = require("./controllers/pageControllers");
//connect MongoDB with Mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES (between of the req and res)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //response form (reading url data)
app.use(express.json()); //converting data to json file to read
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//ROUTES (path directory)
//Index
app.get("/", photoController.getAllPhotos);
//About
app.get("/about", pageController.getAboutPage);
//Add Photo
app.get("/add", pageController.getAddPage);
//Photo Pages
app.get("/photos/:id", photoController.getSinglePhoto);
//Edit Page
app.get("/photos/edit/:id", pageController.editPage);
//File Upload
app.post("/photos", photoController.createPhoto);
//Update post
app.put("/photos/:id", photoController.updatePhoto);
//Delete post
app.delete("/photos/:id", photoController.deletePhoto);

//Server
const port = 3000;
app.listen(port, () => {
  console.log(`>>Server started at port ${port}`);
});

//get, post, put, patch, delete
//npm start (start with nodemon)
