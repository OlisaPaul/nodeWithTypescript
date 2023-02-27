import express from "express";

type Ireq = Boolean;

interface IreqRequest extends express.Request {
  user: { isAdimin: boolean };
}

// This middleware checks if the user is an admin, the highest level of authorization.
// The isAdmin property is only given at the database level for authencity
export default function admin(
  req: IreqRequest,
  res: express.Response,
  next: express.NextFunction
) {
  if (!req.user.isAdmin) return res.status(403).send("Access denied");

  next();
}
