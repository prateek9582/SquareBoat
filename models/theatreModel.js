const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter name"]
    },
    phone :{
        type: Number
    },
    location : {
        type: String
    },
    owner : String,
    movie : [String]
});

const theatreModel = mongoose.model("theatremodel",theatreSchema);

module.exports = theatreModel;