import mongoose from "mongoose";
import admin from "../middleware/admin";
import auth from "../middleware/auth";
import validateMiddleware from "../middleware/validate";
import validateObjectId from "../middleware/validateObjectId";
import asyncMiddleware from "../middleware/async";
import { Room, validate, validatePatch } from "../model/room";
import { RoomType } from "../model/roomType";
import express from "express";
import Ireq from "../interface/req.interface";
const router = express.Router();

router.get(
  "/",
  auth,
  // the asyncMiddleware function is used to handle promise rejection
  asyncMiddleware(async (req: express.Request, res: express.Response) => {
    let query = new Map();

    if (req.query.search) query.set("name", req.query.search);

    if (req.query.maxPrice)
      query.set("price", {
        $gte: req.query.minPrice || 0,
        $lte: req.query.maxPrice,
      });

    if (req.query.roomType) {
      const roomType = await RoomType.find({ name: req.query.roomType });
      query.set("roomType", roomType[0]._id);
    }

    query = Object.fromEntries(query);

    const rooms = await Room.find(query);
    res.send(rooms);
  })
);

router.get(
  "/:id",
  [validateObjectId, auth],
  asyncMiddleware(async (req: express.Request, res: express.Response) => {
    //to search if the room is available in the database
    const room = await Room.findById(req.params.id);

    // sends a 404 response to the client if not available
    if (!room)
      return res.status(404).send("We can't find room with the given ID");

    // provides the given room
    res.send(room);
  })
);

router.patch(
  "/:id",
  [validateMiddleware(validatePatch), validateObjectId, auth, admin],
  // validateObjectId is a middleware, it makes sure that the roomId parameter is of the right mongoose Id format.
  asyncMiddleware(async (req: express.Request, res: express.Response) => {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!room)
      return res.status(404).send("We can't find room with the given ID");

    // const { error } = validatePatch(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    res.send(room);
  })
);

router.post(
  "/",
  validateMiddleware(validate),
  auth,
  admin,
  asyncMiddleware(async (req: express.Request, res: express.Response) => {
    const roomType = await RoomType.findById(req.body.roomType);
    if (!roomType)
      return res.status(404).send("We can't find room type with the given ID");

    // Checks for duplicacy
    let room = await Room.findOne({ name: req.body.name });
    if (room) return res.status(400).send("Room already added");

    room = new Room({
      name: req.body.name,
      price: req.body.price,
      roomType: req.body.roomType,
    });

    room = await room.save();

    // Sends the created room as response
    res.send(room);
  })
);

router.delete(
  "/:id",
  validateObjectId,
  auth,
  admin,
  asyncMiddleware(async (req: Ireq, res: express.Response) => {
    // used to delete the room by using the given ID
    const room = await Room.findByIdAndRemove(req.params.id);

    if (!room)
      return res.status(404).send("We can't find room with the given ID");

    res.send(room);
  })
);

// Exports the router object which will  be used in the ../startup/routes.js files
export default router;
