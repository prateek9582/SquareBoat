const movieModel = require("../models/movieModel");
const theatreModel = require("../models/theatreModel");

module.exports.addmovie = async function(req, res){
    try{
        let user = req.user;
        let moviedetails = req.body;
        let theatre = req.params.theatreid;
        // console.log(user);
        // console.log(theatre);
        if(user.role == "Theatre-Owner"){
            const Theatres = user.theatres;
            if(Theatres.includes(theatre)){
                moviedetails.theatre = theatre;
                moviedetails.postedby = user["_id"];
                const movie = await movieModel.create(moviedetails);
                // console.log(movie);
                const gettheatre = await theatreModel.findById(theatre);
                // console.log(gettheatre);
                let movies = gettheatre.movie;
                movies.push(movie["_id"]);
                await theatreModel.findByIdAndUpdate(gettheatre["_id"], {movie : movies}); 
                res.json({
                    succ : "successfully added movie",
                    movie
                })
            }
            else{
                res.json({
                    data : "No theatre exist"
                })
            }
        }
        else{
            res.json({
                data : "you are not authorized for this"
            })
        }
    }catch(err){
        res.json({
            err
        })
    }
}

module.exports.getpreviousmovies = async function(req, res, next){
    try{
        let theatres = req.theatre;
        // console.log(theatres);
        let allmoviesP = [];
        for(var i = 0 ; i < theatres.length ; i++){
            const movies = theatres[i].movie;
            movies.map(movie =>{
                allmoviesP.push(movieModel.findById(movie));
            })
        }
        let allmovies = [];
        allmovies = await Promise.all(allmoviesP);
        let theatresP = [];
        allmovies.map(movie =>{
            const theatre = theatreModel.findById(movie.theatre);
            theatresP.push(theatre);
        })
        let alltheatres = await Promise.all(theatresP);
        
        req.movies = allmovies;
        req.theatre = alltheatres;
        next();

    }catch(err){
        res.json({
            err
        })
    }
}

module.exports.getmovies = async function(req, res,next){
    try{
        const movies = await movieModel.find();
        let theatreP = [];
        movies.map(movie => {
            // console.log(theatre);
            theatreP.push(theatreModel.findById(movie.theatre));
        })
        let theatresall = [];
        theatresall = await Promise.all(theatreP);
        req.theatre = theatresall;
        req.movies = movies;
        next();
    }catch(err){
        res.json({
            err
        })
    }
}