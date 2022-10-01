//DB Connect Route
const Photo = require('../models/Photo');
//FS Module
const fs = require("fs");

//INDEX
exports.getAllPhotos = async (req, res) => {
  const photos = await Photo.find({}).sort("-dateCreated");
  res.render("index", {
    photos,
  });
};
//PHOTO PAGES
exports.getSinglePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render("photo", {
    photo, 
  });
};
//FILE UPLOAD
exports.createPhoto = async (req, res) => {
  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const photo = await Photo.create({
    ...req.body,
  });

  let uploadedImage = req.files.image.name.split(".");
  let uploadedImageName = uploadedImage[0] + photo._id + "." + uploadedImage[1];
  let path = __dirname + "/../public/uploads/" + uploadedImageName;

  req.files.image.mv(path, async () => {
    photo.image = "/uploads/" + uploadedImageName;
    await photo.save();
    res.redirect("/");
  });
};
//UPDATE POST WITH OVERRIDE METHOD (PUT)
exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
};
//DELETE METHOD (GET OVERRIDE)
exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + "/../public" + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect("/");
};
