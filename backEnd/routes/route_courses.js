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

router.post("/createCourse",async function(req,res){
    let courseName = req.body.courseName;
    let courseContent = req.body.courseContent;
    let coursePrice = req.body.coursePrice;
    let teacherID = req.body.teacherID;
    let category = req.body.category;
    let state = await courseModel.createCourse(courseName,courseContent,coursePrice,teacherID,category);
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

router.post("/updateCoursePoint",async function(req,res){
    let courseID = req.body.courseID;
    let point = req.body.point;
    let state = await courseModel.updateCoursePoint(courseID,point);
    if(state == 0){
        res.json({state:0});
    } else {
        res.json({state:1});
    }
})


router.get("/getCoursePoint/:course_id",async function(req,res){
    let courseID = req.params.course_id;
    let point = await courseModel.getCoursePoint(courseID);
    res.json(point);
})

router.get("/getCoursesByTeacher/:teacher_id",async function(req,res){
    let teacherID = req.params.teacher_id;
    let list = await courseModel.getCoursesByTeacher(teacherID);
    if(list === 0){
        res.json({state:0})
    } else {
        res.json(list);
    }
    
})


module.exports = router;