const express = require("express");
const app = express();
const route_categories = require("./routes/routes_categories")
const route_courses = require("./routes/route_courses")

app.use("/api/categories",route_categories);
app.use("/api/getCoursesByCategory",route_courses);

const Port = 3000;
app.listen(Port,()=>{
    console.log("Server is running at port " + Port);
})