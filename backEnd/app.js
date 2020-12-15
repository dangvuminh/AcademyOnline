const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors = require("cors");

const route_categories = require("./routes/routes_categories")
const route_courses = require("./routes/route_courses")
const route_student = require ("./routes/route_student")
const authen = require("./middleware/student.authen.mdw")

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.use("/api/categories",route_categories);
app.use("/api/getCoursesByCategory",route_courses);
app.use("/api/getSingleCourse",route_courses);
app.use("/api",route_student);
app.use("/api/signIn",authen,route_student);


const Port = 4000;
app.listen(Port,()=>{
    console.log("Server is running at port " + Port);
})