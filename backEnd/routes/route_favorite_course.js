const express = require("express");
const router = express.Router();
const favorite_course_model = require("../models/favorite_course")

router.post("/changeFavoriteCourseState",async function(req,res){
    let courseID = req.body.courseID;
    let studentID = req.body.studentID;
    let favoriteState = req.body.state;
    let state = await favorite_course_model.changeFavoriteCourseState(courseID,studentID,favoriteState);
    console.log(state);
    res.json({
        state : state
    })
});

router.post("/getFavoriteCourseState",async function(req,res){
    let courseID = req.body.courseID;
    let favoriteState = await favorite_course_model.getFavoriteCourseState(courseID);
    if(favoriteState == 0){
        res.json({
            state: 0
        })
    } else{
        res.json(favoriteState)
    }
});

router.post("/getFavoriteCourseList",async function(req,res){
    let studentID = req.body.studentID;
    let list = await favorite_course_model.getAll(studentID);
    if(list == 0){
        res.json({
            state: 0,
        })
    } else{       
    res.json(list);
    }
   
});

module.exports = router;