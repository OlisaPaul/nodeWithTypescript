import validateMiddleware from "../middleware/validate";
import admin from "../middleware/admin";
import auth from "../middleware/auth";
import bcrypt from "bcrypt";
import _ from "lodash";
import { User, validate } from "../model/user";
import express from "express";
const router = express.Router();

// This is used for registering a new user.
router.post(
  "/",
  validateMiddleware(validate),
  async (req: express.Request, res: express.Response) => {
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
  }
);

export default router;
