import express from "express";

// when the router handler function is passed as an argument to this function,
// it helps to handle the rejected promise of the handler function
export default function asyncMiddleware(handler: any) {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await handler(req, res);
    } catch (ex) {
      // this passes control to the next middleware function (error) and takes exception as an argument
      next(ex);
    }
  };
}
