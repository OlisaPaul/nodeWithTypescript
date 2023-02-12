// This file determines which of the routes will be used based on the api url
const express = require("express");
const error = require("../middleware/error");
const rooms = require("../routes/rooms");
const roomTypes = require("../routes/rooomTypes");

module.exports = function (app) {
  app.use(express.json());

  // if the api is {{baseUrl}}/api/v1/rooms, it uses the rooms method in the router object
  app.use("/api/v1/rooms", rooms);

  // if the api is {{baseUrl}}/api/v1/rooms-types, it uses the roomTypes method in the router object
  app.use("/api/v1/rooms-types", roomTypes);

  // it calls the error middleware if there was a rejected promise.
  app.use(error);
};
