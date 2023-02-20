const Joi = require("joi");
const mongoose = require("mongoose");

const roomTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
  },
});

const RoomType = mongoose.model("roomType", roomTypeSchema);

function validate(roomType) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
  });

  return schema.validate(roomType);
}

// To make the validate and RoomType available anywhere in the app.
exports.validate = validate;
exports.RoomType = RoomType;
