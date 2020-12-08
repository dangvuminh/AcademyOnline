const mysql = require("mysql2");
const express = require("express");
const router = express.Router();
const db = require("../ultils/db.js");

router.get("/",(req,res)=>{
    db.query("SELECT * FROM category",(err,data)=>{
        if(err){
            throw err;
        } else{
            res.json(data);
        }
    })
})

module.exports = router;