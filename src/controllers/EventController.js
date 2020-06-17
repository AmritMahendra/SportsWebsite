const Event = require("../models/events.js");
const User = require("../models/User.js");

module.exports = {
  async createEvent(req, res) {
    const { title, description, price } = req.body;
    const { user_id } = req.headers;
    const { fileName } = req.file;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).send("Such a user does not exist in the system");
    }

    const event = await Event.create({
      title,
      description,
      price: parseFloat(price),
      user: user_id,
      thumbnail: fileName,
    });

    return res.json(event);
  },

  async getEventById(req, res) {
    console.log("H");
    const { eventId } = req.params;
    console.log("Hi");
    try {
      const event = await Event.findById(eventId);
      if (event) {
        return res.json(event);
      }
    } catch (error) {
      return res.status(400).json({ message: "EventId does not exist!" });
    }
  },
};
