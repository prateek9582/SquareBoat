const express = require("express");
const { protectroute, logout } = require("../controllers/userController");
const viewRouter = express.Router();
const { getheatre} = require("../controllers/theatreController");
const { getmovies, getpreviousmovies } = require("../controllers/movieController");
const { pastbooking } = require("../controllers/bookingController");
const { getHomePage, getLoginPage, getSignupPage, getProfilePage, getTheatrePage, getNewMoviePage,getAvailableMovies, getBookedMovies, getPreviousMoviesPage} = require("../controllers/viewController");

viewRouter.route("").get(getHomePage);
viewRouter.route("/login").get(getLoginPage);
viewRouter.route("/signup").get(getSignupPage);
viewRouter.route("/me").get(protectroute, getProfilePage);
viewRouter.route("/logout").get(logout);
viewRouter.route("/newtheatre").get(protectroute, getTheatrePage);
viewRouter.route("/newmovie").get(protectroute, getheatre ,getNewMoviePage);
viewRouter.route("/movies/available").get(protectroute, getmovies, getAvailableMovies);
viewRouter.route("/movies/booked").get(protectroute,pastbooking,getBookedMovies);
viewRouter.route("/movies").get(protectroute,getheatre, getpreviousmovies, getPreviousMoviesPage);
module.exports = viewRouter;