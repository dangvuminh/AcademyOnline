const express = require("express");
const router = express.Router();
const initialModel = require("../models/initial/num_of_student")

router.get("/updateStudentNumber",async function(req,res){
    let state = await initialModel.updateStudentNumber();
    res.json(state);
})

module.exports = router;