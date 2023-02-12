const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  // Intiallizes the db URI
  const db = config.get("db");
  // To connect to the mongodb database.
  // Then is called when the promise is fufiled and catch is called when the promise is rejected.
  mongoose
    .connect(db)
    .then(() => console.info(`Connected to database...`))
    .catch(() => console.log("Database not connected"));
};
