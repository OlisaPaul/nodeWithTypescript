const mongoose = require("mongoose");

// Another middleware function to check the ID parameter.
module.exports = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid ID");

  next();
};
