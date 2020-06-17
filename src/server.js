const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const UserController = require("./controllers/UserController");
const routes = require("./routes.js");

app.use(cors());
app.use(routes);

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

try {
  mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
} catch (error) {
  console.log("Hi");
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server up and running"));
