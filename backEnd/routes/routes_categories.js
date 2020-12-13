const mysql = require("mysql2");
const express = require("express");
const router = express.Router();
const db = require("../ultils/db.js");
const categoriesModel = require("../models/categories")

router.get("/",async function(req,res){
    let  categories = await categoriesModel.getCategories(); 
    res.send(categories);
})

module.exports = router;