const Joi = require("joi");
const mongoose = require("mongoose");

const roomTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const RoomType = mongoose.model("roomType", roomTypeSchema);

function validate(roomType) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  });

  return schema.validate(roomType);
}

// To make the validate and RoomType available anywhere in the app.
exports.validate = validate;
exports.RoomType = RoomType;
