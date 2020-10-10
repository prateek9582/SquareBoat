const express = require("express");
const { protectroute } = require("../controllers/userController");
const { createtheatre } = require("../controllers/theatreController");

const theatreRouter = express.Router();

theatreRouter.route("/createtheatre").post(protectroute, createtheatre);

module.exports = theatreRouter;