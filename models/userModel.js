const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter name"]
    },
    email :{
        type : String,
        unique : true,
        required : [true, "Please enter your email"],
        validate : validator.isEmail
    },
    password : {
        type : String,
        minlength : 5,
        required:[true,"Please enter password"]
    },
    phone : {
        type : Number,
    },
    role : {
        type : String,
        enum : ["Customer" , "Theatre-Owner"],
        default : "Customer"
    },
    bookedmovies : [String],
    theatres : [String]
});

const userModel = mongoose.model("usermodel",userSchema);

module.exports = userModel;
