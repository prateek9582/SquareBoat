const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    movie : String,
    bookingtime : String,
    seat : {
        type: Number,
        default : 1
    }
})

const bookingModel = mongoose.model("bookingmodel",bookingSchema);
module.exports = bookingModel;