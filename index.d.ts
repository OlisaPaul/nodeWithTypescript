import { Express } from "express-serve-static-core";

interface Ireq {
  user: any;
}

declare module "express-serve-static-core" {
  interface Request {
    user: Ireq;
  }
}
