const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true,"Please enter the name of the movie"]
    },
    theatre : String,
    postedby : String,
    time :{
        type : String,
        required : [true,"Please enter time of the movie"]
    },
    bookedby : [String]
});

const movieModel = mongoose.model("moviemodel",movieSchema);
module.exports = movieModel;