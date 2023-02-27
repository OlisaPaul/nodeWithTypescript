import Joi from "joi";
import mongoose from "mongoose";
import RoomInterface from "../interface/room.interface";

const roomTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const RoomType = mongoose.model("roomType", roomTypeSchema);

function validate(roomType: RoomInterface) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  });

  return schema.validate(roomType);
}

// To make the validate and RoomType available anywhere in the app.

export { validate, RoomType };
