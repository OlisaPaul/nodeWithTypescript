import express from "express";

type Ireq = Boolean;

// This middleware checks if the user is an admin, the highest level of authorization.
// The isAdmin property is only given at the database level for authencity
export default function admin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!req.user.isAdmin) return res.status(403).send("Access denied");

  next();
}
