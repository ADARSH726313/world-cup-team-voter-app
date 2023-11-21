const express = require("express");

const  app = express();
const bodyparser = require("body-parser")
const mongoose = require("mongoose");
let user = "mongodb+srv://adu:adsadt123@cluster1.i7xzqtp.mongodb.net/ ";

mongoose.connect(user)
.then(console.log(" database is running"))
.catch((err)=>{
    console.log("error")
})
app.use(bodyparser.urlencoded({ extended : true}))

app.set("view engine", "ejs")

app.use('/',require('./Routes/routes'));


app.listen(3000,()=>{
    console.log("server is running ")
})