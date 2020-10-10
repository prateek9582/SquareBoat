const express = require("express");
const { protectroute } = require("../controllers/userController");
const { createbooking, pastbooking } = require("../controllers/bookingController");
const bookingRouter = express.Router();

bookingRouter.route("/:movieid").post(protectroute, createbooking);
bookingRouter.route("/pastbooking").get(protectroute, pastbooking);

module.exports = bookingRouter;