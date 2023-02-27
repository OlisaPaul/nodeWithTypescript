import _ from "lodash";
import jwt from "jsonwebtoken";
import config from "config";
import mongoose from "mongoose";
import { Model, Schema, model } from "mongoose";
import Joi from "joi";
import Iuser from "../interface/user.inteface";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 255,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    trim: true,
    unique: true,
    required: true,
  },
  isAdmin: Boolean,
});

interface UserModel extends Model<Iuser> {
  generateAuthToken(): string;
}

type userModel = Model<Iuser, {}, UserModel>;

userSchema.method("generateAuthToken", function generateAuthToken() {
  const token: string = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin, name: this.name },
    config.get("jwtPrivateKey")
  );
  return token;
});

const User = mongoose.model<Iuser, any>("User", userSchema);

function validate(user: Iuser) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    password: Joi.string().min(5).max(1024).required(),
    email: Joi.string().email().min(5).max(255).required(),
  });

  return schema.validate(user);
}

export { validate, User };
