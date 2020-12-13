const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")

const studentModel = require("../models/student")

router.post("/studentSignUp", async function (req, res) {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let username = req.body.username;
    let password = bcrypt.hashSync(req.body.password, 10);
    let isAdded = await studentModel.createStudent(firstname, lastname, email, username, password);
    console.log(isAdded)
    if (isAdded === 1) {
        res.sendStatus(201);
    } else
        res.sendStatus(400);
})

router.post("/studentSignIn", async function (req, res) {
    let password = req.body.password;
    let username = req.body.username;
    let user = await studentModel.getStudent(username, password);
   console.log(user);
    if (user == -1){
        
        res.json({
            authenticated: -1
        });
    } else   
    if (user == 0){
        res.json({
            authenticated: 0
        }) 
    } else {
        res.json({
            authenticated: 1,
            user
        });
    }  
   

})

module.exports = router;