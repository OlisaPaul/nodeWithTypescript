const asyncMiddleware = require("../middleware/async");
const express = require("express");
const router = express.Router();
const { RoomType, validate } = require("../model/roomType");

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const roomTypes = await RoomType.find();
    res.send(roomTypes);
  })
);

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let roomType = new RoomType({
      name: req.body.name,
    });

    roomType = await roomType.save();

    res.send(roomType);
  })
);

// Exports the router object which will  be used in the ../startup/routes.js files
module.exports = router;
