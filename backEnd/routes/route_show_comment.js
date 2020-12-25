const express = require("express");
const router = express.Router();
const commentModel = require("../models/comment/showComment")

router.post("/getCOmmentList",async function(req,res){
    let courseID = req.body.courseID;
    let list = await commentModel.getCommentList(courseID);
    if(list == 0){
    res.json({
        state: 0
    })
    } else {
        res.json(list)
    }
})

module.exports = router;