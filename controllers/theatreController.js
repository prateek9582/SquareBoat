const theatreModel = require("../models/theatreModel");
const userModel = require("../models/userModel");

module.exports.createtheatre = async function(req, res, next){
    try{
        let user = req.user;
        console.log(user);
        if(user.role == "Theatre-Owner"){
            let theatredetails = req.body;
            theatredetails.owner = user["_id"];
            const newtheatre = await theatreModel.create(theatredetails);
            // console.log(newtheatre);
            let updatetheatre = user.theatres;
            updatetheatre.push(newtheatre["_id"]);
            await userModel.findByIdAndUpdate(user["_id"], {theatres : updatetheatre});
            res.json({
                succ : "successfully added theatre",
                newtheatre
            })
        }
        else{
            res.json({
                data : "you are not authorized for this"
            })
        }
    }catch(err){
        console.log(err);
        res.json({
            err
        })
    }
}
module.exports.getheatre = async function(req, res,next){
    try{
        let user = req.user;
        if(user.role == "Theatre-Owner"){
            let theatres = user.theatres;
            
            // console.log(theatres);
            let theatreP = [];
            theatres.map(theatre => {
                // console.log(theatre);
                theatreP.push(theatreModel.findById(theatre));
            })
            let theatresall =[];
             theatresall = await Promise.all(theatreP);
            req.theatre = theatresall;
            // console.log(theatres);
            next();
        }
        else{
            res.json({
                data:"You are not authorized"
            })
        }

    }catch(err){
        res.json({
            err
        })
    }
}