const express = require("express");
const app = express();
require("./models/connection");
const userRouter = require("./routers/userRouter");
const movieRouter = require("./routers/movieRouter");
const theatreRouter = require("./routers/theatreRouter");
const cookieParser = require("cookie-parser");
const bookingRouter = require("./routers/bookingRouter");
const viewRouter = require("./routers/viewRouter");


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));
app.use("/movies",express.static("public"))
app.set("view engine", "pug");
app.set("views","views");



app.use("/", viewRouter);
app.use("/api/users", userRouter);
app.use("/api/movies",movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/bookings",bookingRouter);

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log(`Server is listening at port ${port}`);
})