const User = require("../models/User.js");
const bcrypt = require("bcrypt");

module.exports = {
  async createUser(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);

      const existingUser = await User.findOne({ email: email });

      if (!existingUser) {
        const user = await User.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashedPassword,
        });

        res.json(user);
      } else res.send("This email already exists!");
    } catch (error) {
      res.json({ message: error });
    }
  },

  async getUserById(req, res) {
    console.log("I am on the right track");
    const { userId } = req.params;

    try {
      const existingUser = await User.findById(userId);
      res.json(existingUser);
    } catch (error) {
      res.json({ message: "Does not exist" });
    }

    //const user = await User.find({ email: req.params.userId });
    //if (user.length == 0) {
    //  console.log("Does not exist");
    //}
    //res.send({ user: req.params.userId });
  },
};
