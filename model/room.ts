// Joi is used for data validation
import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";
import validateObjectId from "../middleware/validateObjectId";
//import objectid from "joi-objectid";
import RoomInterface from "../interface/room.interface";

// The schema determines the structure of the room collection
const roomSchema: Schema = new Schema({
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
    type: Schema.Types.ObjectId,
    required: true,
    ref: "roomType",
  },
});

const Room = mongoose.model<RoomInterface>("room", roomSchema);

//To validate the data before sending to the database
export function validate(room: RoomInterface) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    price: Joi.number().min(0).max(150000).required(),
    roomType: Joi.string().required(),
  });

  return schema.validate(room);
}

export function validatePatch(room: RoomInterface) {
  const schema = Joi.object({
    name: Joi.string().min(5),
    price: Joi.number().min(0).max(150000),
    roomType: Joi.string(),
  });

  return schema.validate(room);
}

export { Room, roomSchema };
