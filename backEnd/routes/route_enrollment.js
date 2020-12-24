
const express = require("express");
const router = express.Router();
const enrollmentModel = require("../models/enrollment")

router.post("/buyCourse",async function(req,res){
    let courseID = req.body.courseID;
    let studentID = req.body.studentID;
    let state = await enrollmentModel.createEnrollment(courseID,studentID);
    console.log(state);
    res.json({
        state : state
    })
})

router.post("/getEnrollment",async function(req,res){
    let studentID = req.body.studentID;
    let list = await enrollmentModel.getAll(studentID);
    if(list == 0){
        res.json({
            state: 0,
        })
    } else{       
    res.json(list);
    }
   
})


module.exports = router;