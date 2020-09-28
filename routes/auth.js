const express = require("express");

const router = express.Router();

//Importing user model
const User = require("../models/user");

//Router level middleware
router.use(express.json());

router.post("/signup", async (req, res) => {
  try {
    const userExists = await User.findOne({ emailId: req.body.emailId });
    if (userExists) {
      return res.status(400).send("User with Email Id already Exists!");
    } else {
      try {
        const salt = await bcrypt.genSalt(30);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
          userName: req.body.userName,
          emailId: req.body.emailId,
          password: hashedPassword,
        });

        let { user_data } = await user.save();

        return res.status(200).send(user_data.userName);
      } catch (err) {
        return res.status(500).send(err.message);
      }
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user_data = await User.findOne({ userName: req.body.userName });
    if (user_data) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user_data.password
      );
      if (!user_data || !validPassword) {
        return res.status(400).send("Invalid Username or Password!");
      }
      return res.status(200).send(`Welcome ${user_data.userName}`);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
