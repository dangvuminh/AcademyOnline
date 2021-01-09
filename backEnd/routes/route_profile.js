const express = require("express");
const router = express.Router();
const profileModel = require("../models/profile")
const bcrypt = require("bcryptjs")

router.post("/updatePassword",async function(req,res){
    let username = req.body.username;
    
    let newPassword = bcrypt.hashSync(req.body.password, 10);
    let state = await profileModel.updatePassword(username,newPassword);
    console.log(state);
    res.json({
        state: state
    })
});

router.post("/updateProfile",async function(req,res){
    let username = req.body.username;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let state = await profileModel.updateProfile(username,firstname,lastname,email);
    console.log(state);
    res.json({
        state: state
    })
});

module.exports = router;