const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');
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
        const refreshToken = randToken.generate(80);
        await studentModel.updateRefrsehToken(username,refreshToken);
        res.json({rfToken:refreshToken});
    } else
        res.sendStatus(400);
})

router.post("/studentSignIn", async function (req, res) {
    let password = req.body.password;
    let username = req.body.username;
    let user = await studentModel.validateStudent(username, password);
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
         //-------------JWT-------------------------
         //console.log(user[0].student_firstname);
         if(!user[0].refreshToken){
            const accessToken = jwt.sign({
                userId: user[0].student_id
              }, 'SECRET_KEY', {
                expiresIn: 1 * 60
              });

              const refreshToken = randToken.generate(80);
              await studentModel.updateRefrsehToken(user[0].username,refreshToken);
                
                res.json({
                    authenticated: 1,
                    accessToken,
                    refreshToken,
                    user
                  })
             
        } else{
            const refreshToken = req.body.refreshToken;
            const result = await studentModel.findRefreshToken(refreshToken);
            const accessToken = jwt.sign({
               userId : result[0].student_id
              }, 'SECRET_KEY', {
                expiresIn: 10 * 60
              });
              res.json({ 
                  accessToken,
                  user
                });
        }
        //---------------JWT---------------------
        // res.json({
        //     authenticated: 1,
        //     user
        // });
    }  
   

})

router.post("/getStudentData",async function(req,res){
    const username = req.body.username;
    const user = await studentModel.getStudentData(username);
    res.send(user);
})

router.post("/checkPassword",async function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    const user = await studentModel.validateStudent(username,password);
    if(user == 0){
        res.json(0);
    } else{
        res.json(1);
    }
})

router.post("/uploadImage",async function(req,res){
    const studentID = req.body.studentID;
    const image = req.body.image;
    const state = await studentModel.uploadImage(studentID,image);
    if(state == 0){
        res.json(0);
    } else{
        res.json(1);
    }
})


module.exports = router;