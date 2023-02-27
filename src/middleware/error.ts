import type { ErrorRequestHandler } from "express";
// this is the next middleware function that is called when a promise is rejected.
const error: ErrorRequestHandler = (err, req, res, next) => {
  // this sends a response of 500 to the client and displays "Something failed" as a response
  res.status(500).send("Something Failed");
};

export default error;
