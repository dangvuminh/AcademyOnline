const express = require("express");
const router = express.Router();
const courseModel = require("../models/enrollment")

router.post("/:courseID/:studentID",async function(req,res){
    let courseID = req.params.courseID;
    let studentID = req.params.studentID;
    let msg = await courseModel.createEnrollment(courseID,studentID);
    res.json({
        message : msg
    })
})

module.exports = router;