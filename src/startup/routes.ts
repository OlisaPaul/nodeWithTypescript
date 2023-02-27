// This file determines which of the routes will be used based on the api url
import express from "express";
import error from "../middleware/error";
import rooms from "../routes/rooms";
import auth from "../routes/auth";
import users from "../routes/users";
import roomTypes from "../routes/rooomTypes";

function route(app: any) {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // if the api is {{baseUrl}}/api/v1/rooms, it uses the rooms method in the router object
  app.use("/api/v1/rooms", rooms);

  // if the api is {{baseUrl}}/api/v1/rooms-types, it uses the roomTypes method in the router object
  app.use("/api/v1/rooms-types", roomTypes);

  app.use("/api/v1/users", users);
  app.use("/api/v1/auth", auth);

  // it calls the error middleware if there was a rejected promise.
  app.use(error);
}

export default route;
