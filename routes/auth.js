const validateMiddleware = require("../middleware/validate");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../model/user");
const express = require("express");
const router = express.Router();

// This is used for authenticating the user
router.post("/", validateMiddleware(validate), async (req, res) => {
  // checking if the user exist
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  //checks if the password is valid
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();

  // sends token as response to the client after validation
  // Token is used to check if client is logged in or not, it's presence means logged in and vice-versa
  res.send(token);
});

router.get("/", async (req, res) => {
  const user = await User.find();

  res.send(user);
});

// for validating the body of the request
function validate(req) {
  const schema = Joi.object({
    password: Joi.string().min(5).max(1024).required(),
    email: Joi.string().email().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
