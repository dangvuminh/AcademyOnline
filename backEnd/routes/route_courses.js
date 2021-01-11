const express = require("express");
const router = express.Router();
const courseModel = require("../models/courses")

router.get("/:category",async function(req,res){
    let categoryID = req.params.category;
    let courses = await courseModel.getCoursesByCategory(categoryID);
    res.json(courses);
})

router.get("/detail/:courseID",async function(req,res){
    let courseID = req.params.courseID;
    let course = await courseModel.getSingle(courseID);
    res.json(course);
})

router.post("/updateCourse",async function(req,res){
    let courseID = req.body.courseID;
    let courseName = req.body.courseName;
    let courseContent = req.body.courseContent;
    let coursePrice = req.body.coursePrice;
    let teacherID = req.body.teacherID;
    let state = await courseModel.updateCourse(courseID,courseName,courseContent,coursePrice,teacherID);
    if(state == 0){
        res.json({state:0});
    } else {
        res.json({state:1});
    }
})

router.post("/deleteCourse",async function(req,res){
    let courseID = req.body.courseID;
    let state = await courseModel.delteCourse(courseID);
    if(state == 0){
        res.json({state:0});
    } else {
        res.json({state:1});
    }
})

module.exports = router;