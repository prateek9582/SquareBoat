module.exports.getHomePage = function(req, res){
    const user = req.user;
    if(user)
        res.render("home.pug",{
            title : "Home Page",
            user: user
        });
    else
        res.render("home.pug",{
            title : "Home Page"
        });
}

module.exports.getLoginPage = function(req, res){
    res.render("login.pug",{
        title: "Login Page"
    })
}

module.exports.getSignupPage = function(req, res){
    res.render("signup.pug",{
        title : "Signup Page"
    })
}
module.exports.getProfilePage = function (req, res) {
    const user = req.user;
    if (user)
        res.render("profile.pug", { user: user })
    else
        res.redirect("/");
}

module.exports.getTheatrePage = function(req, res){
    const user = req.user;
    if(user)
        res.render("addtheatre.pug",{
            user:user
        })
    else
        res.render("/");
}

module.exports.getNewMoviePage = function(req, res){
    const user = req.user;
    const theatre = req.theatre;
    // console.log(theatre);
    if(user)
        res.render("addmovie.pug",{user:user,theatre:theatre});
    else    
        res.render("/")
}

module.exports.getAvailableMovies = function(req, res){
    const user = req.user;
    const theatre = req.theatre;
    const movies = req.movies;
    let alldetails = [];
    for(var i = 0 ; i < movies.length ; i++){
        const details = {
            moviename : movies[i].name,
            theatrename : theatre[i].name,
            time : movies[i].time,
            _id:movies[i]._id
        }
        alldetails.push(details);
    }
    // console.log(movies);
    // console.log(theatre);
    if(user)
        res.render("movies.pug",{user:user,movies:alldetails});
    else
        res.render("/");
}

module.exports.getBookedMovies = function(req, res){
    const user = req.user;
    const bookings = req.bookings;
    // console.log(bookings);
    if(user)
        res.render("booked.pug",{user:user,bookings:bookings});
    else
        res.render("/");
}
module.exports.getPreviousMoviesPage = function(req, res){
    const user = req.user;
    const theatre = req.theatre;
    const movies = req.movies;
    let moviesdetails = [];
    for(let i = 0 ; i < movies.length ;i++){
        let moviesdetail = {
            "moviename" : movies[i].name,
            "theatrename" : theatre[i].name,
            "time" : movies[i].time
        }
        moviesdetails.push(moviesdetail);
    }
    // console.log(moviesdetails);
    if(user)
        res.render("movies.pug",{user:user,movies : moviesdetails, title : "previous"});
    else
        res.render("/");
}