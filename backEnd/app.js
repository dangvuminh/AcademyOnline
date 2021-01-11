const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors = require("cors");

const route_categories = require("./routes/routes_categories")
const route_courses = require("./routes/route_courses")
const route_student = require ("./routes/route_student")
const route_enrollment = require("./routes/route_enrollment")
const route_favorite_course = require("./routes/route_favorite_course")
const route_add_comment = require("./routes/route_add_comment")
const route_show_comment = require("./routes/route_show_comment")
const route_statistics = require("./routes/route_statistics")
const route_point_authen = require("./routes/route_point_authen")
const route_point_no_authen = require("./routes/route_point_no_authen")
const route_profile = require("./routes/route_profile")
const route_teacher = require("./routes/route_teacher")

const authen = require("./middleware/student.authen.mdw")

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());
app.use(express.json());


app.use("/api/categories",route_categories);
app.use("/api/getCoursesByCategory",route_courses);
app.use("/api/course",route_courses);
app.use("/api/getSingleCourse",route_courses);
app.use("/api/student",route_student);
app.use("/api",route_show_comment);
app.use("/api",route_statistics);
app.use("/api",route_point_no_authen);
app.use("/api",route_teacher);

app.use("/api",authen,route_enrollment);
app.use("/api",authen,route_favorite_course);
app.use("/api",authen,route_add_comment);
app.use("/api",authen,route_point_authen);
app.use("/api/profile",authen,route_profile);



const Port = 4000;
app.listen(Port,()=>{
    console.log("Server is running at port " + Port);
})