// Express make the server creation easier
import express from "express";
import route from "./src/startup/routes";
import db from "./src/startup/database";
const app = express();

route(app);
db();

// intializes port with the PORT environment variable if it exists, if not it assigns 3000 to it
const port = process.env.PORT || 3000;

// Makes the server to listen to request on the assigned port.
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

export default server;
