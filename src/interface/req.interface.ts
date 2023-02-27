import express from "express";

interface Ireq extends express.Request {
  user: any;
}

export default Ireq;
