const { RoomType } = require("./model/roomType");

const query = {};

if (req.query.search) query.name = req.query.search;
if (req.query.maxPrice)
  query.price = { $gte: req.query.minPrice || 0, $lte: req.query.maxPrice };
if (req.query.roomType) {
  const roomType = await RoomType.find({ name: req.query.roomType });
  query.roomType = roomType._id;
}
