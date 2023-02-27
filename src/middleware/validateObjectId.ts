import express from "express";
import mongoose from "mongoose";

// Another middleware function to check the roomId parameter.
export default function validateObjectId(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!mongoose.Types.ObjectId.isValid(req.params.roomId))
    return res.status(404).send("Invalid ID");

  next();
}
