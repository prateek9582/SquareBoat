const express = require("express");
const {protectroute} = require("../controllers/userController");
const {addmovie} = require("../controllers/movieController");
const movieRouter = express.Router();

movieRouter.route("/addmovie/:theatreid").post(protectroute, addmovie);
module.exports = movieRouter;