// this middleware is used to validate the body of the request.
// it takes the models validator as a function and acts as a factory fuction.
import express from "express";

export default function validate(validator: any) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { error } = validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  };
}
