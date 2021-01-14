const express = require("express");
const router = express.Router();
const fileModel = require("../models/file")

router.post("/addFile", async function (req, res) {
    let fileName = req.body.fileName;
    let fileUrl = req.body.fileUrl;
    let teacherID = req.body.teacherID;
    let courseID = req.body.courseID;
    let state = await fileModel.addFile(fileName,fileUrl,teacherID,courseID);
    if(state === 0){
        res.json({state:0});
    } else {
        res.json({state:1});
    }
})

router.get("/getFileByCourseID/:courseID", async function (req, res) {
    let courseID = req.params.courseID;
    let file = await fileModel.getFileByCourseID(courseID);
    if(file === 0){
        res.json({state:0});
    } else {
        res.json(file);
    }
})

module.exports = router;