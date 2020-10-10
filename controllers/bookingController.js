const bookingModel = require("../models/bookingModel");
const userModel = require("../models/userModel");
const movieModel = require("../models/movieModel");
const theatreModel = require("../models/theatreModel");

module.exports.createbooking = async function(req, res){
    try{
        let user = req.user;
        let movieid = req.params.movieid;
        req.body.movie = movieid;
        req.body.bookingtime = new Date(Date.now())
        // console.log(user);
        // console.log(movieid);
        const newbooking = await bookingModel.create(req.body);
        let bookedmovie = user.bookedmovies;
        bookedmovie.push(newbooking["_id"]);
        await userModel.findByIdAndUpdate(user["_id"],{bookedmovies : bookedmovie});
        let movie = await movieModel.findById(movieid);
        let userbooked = movie.bookedby;
        userbooked.push(user["_id"]);
        await movieModel.findByIdAndUpdate(movieid,{bookedby : userbooked});
        res.json({
            succ : "movie booked",
            booking:newbooking
        })
    }catch(err){
        res.json({
            err
        })
    }
}


module.exports.pastbooking = async function(req, res,next){
    try{
        let user = req.user;
        const bookings = user.bookedmovies;
        let allbookings=[];
        // console.log(bookings);
        let bookedP = [];
        let movieP = [];
        let theatreP = [];
        bookings.map(function(booking){
            const booked = bookingModel.findById(booking);
            // console.log(booked);
            
            bookedP.push(booked);
        })
        const booked = await Promise.all(bookedP);
        booked.map(function(booking){
            // console.log(booking);
            const movie =  movieModel.findById(booking.movie);
            movieP.push(movie);
        })
        const movie = await Promise.all(movieP);
        console.log(movie);
        movie.map(singlemovie =>{
            const theatre =  theatreModel.findById(singlemovie["theatre"]);
            theatreP.push(theatre);

        })
        const theatre = await Promise.all(theatreP);
        for(var i = 0 ; i < bookings.length ; i++){
            let mappedbooking = {
                "moviename" : movie[i].name,
                "theatrename" : theatre[i].name,
                "showtime" : movie[i].time,
                "bookingtime" : booked[i].bookingtime,
                "bookingid" : booked[i]["_id"],
                "seats" : booked[i].seat
            }
            allbookings.push(mappedbooking);

        }
        // console.log(allbookings);
        req.bookings = allbookings;
        next();
    }catch(err){
        console.log(err);
        res.json({
            err
        })
    }
}

