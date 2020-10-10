const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
// const {KEY} = require("../configs/config");
const KEY = process.env.KEY;

module.exports.SignUp = async function(req, res){
    try{
        const user = await userModel.create(req.body);
        const user_id = user["_id"];
        const token = await jwt.sign({user_id}, KEY);
        res.cookie("jwt", token, {httpOnly : true});
        res.json({
            data : "successfully created",
            succ:"user signed in successfully",
            user : user
        })
    }
    catch(err){
        res.json({
            err
        })
    }
}

module.exports.login = async function(req, res){
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(user){
            const dbpassword = user.password;
            if(dbpassword == password){
                const user_id = user["_id"];
                const token = await jwt.sign({user_id}, KEY);
                res.cookie("jwt", token, {httpOnly : true});
                res.json({
                    succ : "succesfully login",
                    user:user
                })
            }
            else{
                res.json({
                    data: "Wrong Password"
                })
            }
        }
        else{
            res.json({
                data : "User doesn't exist"
            })
        }
    }
    catch(err){
        res.json({
            err
        })
    }
}

module.exports.protectroute = async function(req, res,next){
    try{
        const headers = req.headers;
        // console.log(headers);
        if((headers && headers.authorization) || (req.cookies && req.cookies.jwt)){
            // console.log(headers.authorization.split(" "));
            const token = req.cookies.jwt || headers.authorization;
            // console.log(token);

            var result = await jwt.verify(token,KEY);
            // console.log(result);
            if(result){
                const user = await userModel.findById(result.user_id);
                req.user = user;
                next();
            }else{
                res.json({
                    data:"Your token doesn't match"
                })
            }
        }
        else{
            res.json({
                data:"Something is wrong"
            })
        }
    }
    catch(err){
        res.json({
            err
        })
    }
}

module.exports.logout = async function(req, res){
    try{
        res.cookie("jwt","znbdkbbfs,nd",
        {
            httpOnly : true,
            expires : new Date(Date.now())
        })
        res.redirect("/");
    }catch(err){
        res.json({
            err
        })
    }
}


