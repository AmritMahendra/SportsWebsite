// MODULES
const express = require("express");
const multer = require("multer");

// FILES
const UserController = require("./controllers/UserController.js");
const EventController = require("./controllers/EventController.js");
const uploadConfig = require("./config/upload");

//INSTANCES
const upload = multer(uploadConfig);
const routes = express.Router();
routes.get("/status", (req, res) => {
  res.send({ status: "200" });
});

//Events
routes.get("/event/:eventId ", EventController.getEventById); //Something is wrong here
//routes.delete("/event/:eventId ", EventController.delete); //Something is wrong here as well
routes.post("/event", upload.single("thumbnail"), EventController.createEvent);
routes.get("/events", EventController.getAllEvents);
routes.get("/events/:sport", EventController.getSport);
routes.delete("/events/:eventId", EventController.delete);

//User
routes.post("/events/createEvent", EventController.createEvent);
routes.post("/user/register", UserController.createUser);
routes.post("/user/:userId", UserController.getUserById);

module.exports = routes;

//Event
