import asyncMiddleware from "../middleware/async";
import express from "express";
const router = express.Router();
import { RoomType, validate } from "../model/roomType";

router.get(
  "/",
  asyncMiddleware(async (req: express.Request, res: express.Response) => {
    const roomTypes = await RoomType.find();
    res.send(roomTypes);
  })
);

router.post(
  "/",
  asyncMiddleware(async (req: express.Request, res: express.Response) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let roomType = new RoomType({
      name: req.body.name,
    });

    roomType = await roomType.save();

    res.send(roomType);
  })
);

// Exports the router object which will  be used in the ../startup/routes.js files
export default router;
