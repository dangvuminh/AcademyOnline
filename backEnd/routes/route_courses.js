const express = require("express");
const router = express.Router();
const courseModel = require("../models/courses")

router.get("/:category",async function(req,res){
    let categoryID = req.params.category;
    console.log(categoryID);
    let course = await courseModel.getCoursesByCategory(categoryID);
    res.json(course);
})

module.exports = router;