const express = require("express");
const router = express.Router();
const statisticsModel = require("../models/statistics")

router.get("/getMostEnrolledCourse",async function(req,res){
    const list = await statisticsModel.getMostEnrolled();
    if(list == 0){
        res.json({state:0})
    } else{
        res.json(list);
    }
    
})

module.exports = router;