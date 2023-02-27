// This auth property is used to check if a client is authorized to carry out a function or not.
// It expects a token to be sent as an header in the request sent by the client.
import jwt from "jsonwebtoken";
import config from "config";
import express from "express";
import Ireq from "../interface/req.interface";

export default function auth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): any {
  // Checks to see if the token is present, in the x-auth-token header property.
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied. No token provided");

  try {
    // If the token is present in the request, this verifies the request.
    // It sets the req.user property with the decoded token, if the token is valid
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    // it throws an error which is caught and sent to the client as response.
    res.status(400).send("Invalid Web Token");
  }
}
