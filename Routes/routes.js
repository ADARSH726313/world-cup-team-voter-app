 const express = require("express")

 const controller = require("../controller/controller")

 const route = express.Router()

 const service = require("../services/render")

 route.get("/",service.homeRoute)

 route.get("/registration",service.regis)

 route.get("/adminpage",service.adminpage)

 route.post('/reg/users',controller.create);
 route.post('/login',controller.login);

 route.post('/submit_review',controller.submitReview)

route.post('/Add_p',controller.teamCreate);

 

 module.exports = route