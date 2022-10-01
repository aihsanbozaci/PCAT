//DB Connect Route
const Photo = require('../models/Photo');

//About Page
exports.getAboutPage = (req, res) => {
  res.render("about");
};
//Photo Add Page
exports.getAddPage = (req, res) => {
  res.render("add");
};

//Edit Page
exports.editPage = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    res.render("edit", {
      photo,
    });
  };
  