const express = require("express");
const router = express.Router();
const point_model = require("../models/point/point_authen")

router.post("/addPoint",async function(req,res){
    let studentID = req.body.studentID;
    let point = req.body.point;
    let courseID = req.body.courseID;
    let state = await point_model.addPoint(courseID,studentID,point); 
    res.json(state)
});

router.post("/getStateOfPoint",async function(req,res){
    let studentID = req.body.studentID;
    let courseID = req.body.courseID;
    console.log(studentID);
    let state = await point_model.getState(courseID,studentID); 
    res.json(state)
});

module.exports = router;
