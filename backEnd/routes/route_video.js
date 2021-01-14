const express = require("express");
const router = express.Router();
const videoModel = require("../models/video")

router.post("/addVideo", async function (req, res) {
    let videoName = req.body.videoName;
    let videoUrl = req.body.videoUrl;
    let teacherID = req.body.teacherID;
    let courseID = req.body.courseID;
    let state = await videoModel.addVideo(videoName,videoUrl,teacherID,courseID);
    if(state === 0){
        res.json({state:0});
    } else {
        res.json({state:1});
    }
})

router.get("/getVideoByCourseID/:courseID", async function (req, res) {
    let courseID = req.params.courseID;
    let video = await videoModel.getVideoByCourseID(courseID);
    if(video === 0){
        res.json({state:0});
    } else {
        res.json(video);
    }
})

module.exports = router;