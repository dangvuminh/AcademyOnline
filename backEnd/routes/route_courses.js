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

module.exports = router;