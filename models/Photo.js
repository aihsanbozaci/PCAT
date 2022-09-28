//Mongoose connect
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const PhotoSchema = new Schema({
    title: String,
    description: String,
    image: String, //because adresses are strings
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

//Model
const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;