const validateObjectId = require("../middleware/validateObjectId");
const asyncMiddleware = require("../middleware/async");
const express = require("express");
const router = express.Router();
const { Room, validate, validatePatch } = require("../model/room");
const { RoomType } = require("../model/roomType");

router.get(
  "/",
  // the asyncMiddleware function is used to handle promise rejection
  asyncMiddleware(async (req, res) => {
    const query = {};

    if (req.query.search) query.name = req.query.search;

    if (req.query.maxPrice)
      query.price = { $gte: req.query.minPrice || 0, $lte: req.query.maxPrice };

    if (req.query.roomType) {
      const roomType = await RoomType.find({ name: req.query.roomType });
      query.roomType = roomType[0]._id;
    }

    const rooms = await Room.find(query);
    res.send(rooms);
  })
);

router.get(
  "/:roomId",
  validateObjectId,
  asyncMiddleware(async (req, res) => {
    //to search if the room is available in the database
    const room = await Room.findById(req.params.roomId);

    // sends a 404 response to the client if not available
    if (!room)
      return res.status(404).send("We can't find room with the given ID");

    // provides the given room
    res.send(room);
  })
);

router.patch(
  "/:roomId",
  // validateObjectId is a middleware, it makes sure that the roomId parameter is of the right mongoose Id format.
  validateObjectId,
  asyncMiddleware(async (req, res) => {
    const room = await Room.findByIdAndUpdate(
      req.params.roomId,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!room)
      return res.status(404).send("We can't find room with the given ID");

    const { error } = validatePatch(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    res.send(room);
  })
);

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    // the validate function is imported from the model of this room
    // This make sure the client sends in the right info
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checks for duplicacy
    // let room = await Room.findOne({ name: req.body.name });
    // if (room) return res.status(400).send("Room already added");

    let room = new Room({
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
  "/:roomId",
  validateObjectId,
  asyncMiddleware(async (req, res) => {
    // used to delete the room by using the given ID
    const room = await Room.findByIdAndRemove(req.params.roomId);

    if (!room)
      return res.status(404).send("We can't find room with the given ID");

    res.send(room);
  })
);

// Exports the router object which will  be used in the ../startup/routes.js files
module.exports = router;
