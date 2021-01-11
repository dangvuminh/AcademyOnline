const mysql = require("mysql2");
const express = require("express");
const router = express.Router();
const teacherModel = require("../models/teacher")

router.get("/getTeacherList",async function(req,res){
    let  list = await teacherModel.getTeacherList(); 
    res.send(list);
})

module.exports = router;