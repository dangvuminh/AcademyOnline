const mysql = require("mysql2");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const teacherModel = require("../models/teacher");

router.get("/getTeacherList",async function(req,res){
    let  list = await teacherModel.getTeacherList(); 
    res.send(list);
});

router.post("/createTeacher",async function(req,res){
    let username = req.body.username;
    //let password = bcrypt.hashSync(req.body.password, 10);
    let password = req.body.password;
    let  state = await teacherModel.createTeacher(username,password); 
    if(state == 0)
    res.json({state:0}); else
    res.json({state:1});
});


module.exports = router;