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
routes.get("/event/:eventId ", EventController.getEventById);
routes.delete("/event/:eventId ", EventController.delete);
routes.post("/event", upload.single("thumbnail"), EventController.createEvent);
routes.get("/events", EventController.getAllEvents);
routes.get("/events/:sport", EventController.getSport);

//User
routes.post("/events/createEvent", EventController.createEvent);
routes.post("/user/register", UserController.createUser);
routes.post("/user/:userId", UserController.getUserById);
module.exports = routes;

//Event
