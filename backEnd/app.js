const express = require("express");
const app = express();
const route_categories = require("./routes/routes_categories")

app.use("/api/categories",route_categories);

const Port = 3000;
app.listen(Port,()=>{
    console.log("Server is running at port " + Port);
})