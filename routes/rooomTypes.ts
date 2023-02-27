import validateMiddleware from "../middleware/validate";
import validateObjectId from "../middleware/validateObjectId";
import auth from "../middleware/auth";
import admin from "../middleware/admin";
import asyncMiddleware from "../middleware/async";
import { RoomType, validate } from "../model/roomType";
import express from "express";
const router = express.Router();

router.get(
  "/",
  auth,
  asyncMiddleware(async (req: express.Request, res: express.Response) => {
    const roomTypes = await RoomType.find();
    res.send(roomTypes);
  })
);

router.post(
  "/",
  [validateMiddleware(validate), auth, admin],
  asyncMiddleware(async (req: express.Request, res: express.Response) => {
    let roomType = new RoomType({
      name: req.body.name,
    });

    roomType = await roomType.save();

    res.send(roomType);
  })
);

router.patch(
  "/:id",
  [validateMiddleware(validate), validateObjectId, auth, admin],
  // validateObjectId is a middleware, it makes sure that the ID parameter is of the right mongoose Id format.
  asyncMiddleware(async (req: express.Request, res: express.Response) => {
    const roomType = await RoomType.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!roomType)
      return res.status(404).send("We can't find room type with the given ID");

    // const { error } = validatePatch(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    res.send(roomType);
  })
);

router.delete(
  "/:id",
  [validateObjectId, auth, admin],
  asyncMiddleware(async (req: express.Request, res: express.Response) => {
    // used to delete the room by using the given ID
    const roomType = await RoomType.findByIdAndRemove(req.params.id);

    if (!roomType)
      return res.status(404).send("We can't find room type with the given ID");

    res.send(roomType);
  })
);
// Exports the router object which will  be used in the ../startup/routes.js files
export default router;
