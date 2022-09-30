const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const fs = require("fs");
//connect MongoDB with Mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ejs = require("ejs");

const path = require("path");

const Photo = require("./models/Photo");
//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES (between of the req and res)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //response form (reading url data)
app.use(express.json()); //converting data to json file to read
app.use(fileUpload());
app.use(methodOverride("_method"));

//ROUTES (path directory)
app.get("/", async (req, res) => {
  const photos = await Photo.find({}).sort("-dateCreated");
  res.render("index", {
    photos,
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add", (req, res) => {
  res.render("add");
});
app.get("/photos/:id", async (req, res) => {
  //burada adını ne verdiysem "/photos" indexte öyle çekebilirim!!!!
  //console.log(req.params.id);
  //res.render('photo');
  const photo = await Photo.findById(req.params.id);
  res.render("photo", {
    photo, //solo
  });
});
//UPDATE GET
app.get("/photos/edit/:id", async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id }); //seçilen fotoğraf yakalandı
  res.render("edit", {
    //göndereceğimiz yeri seçtik
    photo, //neyi göndereceğimizi ekliyoruz
  });
});
//FILE UPLOAD
app.post("/photos", async (req, res) => {
  //console.log(req.body);
  //console.log(req.files.image);
  // await Photo.create(req.body);
  // res.redirect('/');
  const uploadDir = "public/uploads";
  //Eğer uploads klasörü yoksa oluştur.
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + "/public/uploads/" + uploadedImage.name;
  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadedImage.name,
    });
    res.redirect("/");
  });
});

//UPDATE POST WITH OVERRIDE METHOD (PUT)
app.put("/photos/:id", async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id }); //seçilen fotoğraf yakalandı
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`)
});

const port = 3000;
app.listen(port, () => {
  console.log(`>>Server started at port ${port}`);
});

//get, post, put, patch, delete
//npm start (start with nodemon)
