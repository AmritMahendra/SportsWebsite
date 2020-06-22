const Event = require("../models/events.js");
const User = require("../models/User.js");

module.exports = {
  async createEvent(req, res) {
    const { title, description, price, sport } = req.body;
    const { user_id } = req.headers;
    const { fileName } = req.file;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).send("Such a user does not exist in the system");
    }

    const event = await Event.create({
      title,
      description,
      sport,
      price: parseFloat(price),
      user: user_id,
      thumbnail: fileName,
    });

    return res.json(event);
  },

  async getEventById(req, res) {
    const { eventId } = req.params;
    try {
      const event = await Event.findById(eventId);
      if (event) {
        return res.json(event);
      }
    } catch (error) {
      return res.status(400).json({ message: "Id does not exist" });
    }
  },

  // async getEventById(req, res) {

  //   const { eventId } = req.params;
  //   try {
  //     const event = await Event.findById(eventId);
  //     if (event) {
  //       return res.json(event);
  //     }
  //   } catch (error) {
  //     return res.status(400).json({ message: "Id does not exist" });
  //   }
  // },

  async getAllEvents(req, res) {
    try {
      const events = await Event.find({});
      if (events) {
        return res.json(events);
      }
    } catch (error) {
      return res.status(400).json({ message: "EventId does not exist!" });
    }
  },

  async getSport(req, res) {
    const { sport } = req.params;
    const query = { sport } || {};
    try {
      const events = await Event.find(query);
      if (events) {
        return res.json(events);
      }
    } catch (error) {
      return res.status(400).json({ message: "EventId does not exist!" });
    }
  },

  async delete(req, res) {
    const { eventId } = req.params;
    try {
      await Event.findByIdAndDelete(eventId);
      return res.status(204).json({ message: "ok" });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Sorry we do not have that event yet" });
    }
  },
};
