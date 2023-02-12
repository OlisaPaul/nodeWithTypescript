const mongoose = require("mongoose");

// Another middleware function to check the roomId parameter.
module.exports = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.roomId))
    return res.status(404).send("Invalid ID");

  next();
};
