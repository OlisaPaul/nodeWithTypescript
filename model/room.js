// Joi is used for data validation
const Joi = require("joi");
const mongoose = require("mongoose");
const validateObjectId = require("../middleware/validateObjectId");

// The schema determines the structure of the room collection
const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    // required makes sure the name is provided by the client.
    required: true,
    minlength: 5,
    maxlength: 50,
  },

  price: { type: Number, min: 0, required: true },

  roomType: {
    // this makes sure that the use provides a mongooseId.
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "roomType",
  },
});

const Room = mongoose.model("room", roomSchema);

//To validate the data before sending to the database
function validate(room) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    price: Joi.number().min(0).max(150000).required(),
    roomType: Joi.objectId().required(),
  });

  return schema.validate(room);
}

function validatePatch(room) {
  const schema = Joi.object({
    name: Joi.string().min(5),
    price: Joi.number().min(0).max(150000),
    roomType: Joi.objectId(),
  });

  return schema.validate(room);
}

exports.validatePatch = validatePatch;
exports.validate = validate;
exports.Room = Room;
exports.roomSchema = roomSchema;
