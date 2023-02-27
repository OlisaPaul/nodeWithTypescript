import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "../config/config";

dotenv.config();
function db() {
  // Intiallizes the db URI
  const db = config.mongo.uri;
  // To connect to the mongodb database.
  // Then is called when the promise is fufiled and catch is called when the promise is rejected.
  mongoose
    .connect(db)
    .then(() => console.info(`Connected to database...`))
    .catch(() => console.log("Database not connected"));
}

export default db;
