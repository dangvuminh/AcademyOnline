const express = require("express");
const router = express.Router();
const point_model = require("../models/point/point_no_authen")


router.get("/getPointsById/:courseID",async function(req,res){
    let courseID = req.params.courseID;
    let state = await point_model.getPointsByID(courseID); 
    if(state == 0){
        res.json({state: 0})
    }  else{
        res.json(state)
    }
})

module.exports = router;