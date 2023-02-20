const validateMiddleware = require("../middleware/validate");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../model/user");
const express = require("express");
const router = express.Router();

// This is used for registering a new user.
router.post("/", validateMiddleware(validate), async (req, res) => {
  // Checks if a user already exist by using the email id
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ["name", "password", "email"]));
  const salt = await bcrypt.genSalt(10);
  // for hashing the password that is saved the database for security reasons
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  // it creates a token which is sent as an header to the client
  const token = user.generateAuthToken();
  res
    .header("x-auth-header", token)
    // It determines what is sent back to the client
    .send(_.pick(user, ["_id", "name", "email"]));
});

router.get("/", [auth, admin], async (req, res) => {
  const user = await User.find();

  res.send(user);
});

module.exports = router;
