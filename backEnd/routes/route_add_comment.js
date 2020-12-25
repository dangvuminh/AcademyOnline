const express = require("express");
const router = express.Router();
const commentModel = require("../models/comment/addComment")


router.post("/addComment",async function(req,res){
    let courseID = req.body.courseID;
    let studentID = req.body.studentID;
    let comment = req.body.comment;
    let state = await commentModel.addComment(comment,courseID,studentID);
    if(state == 0){
    res.json({
        state: 0
    })
    } else {
        res.json({
            state: 1
        })
    }
})


module.exports = router;