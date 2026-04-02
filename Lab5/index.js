import PathParameters from "./PathParameters.js";
import WorkingWithArrays from "./WorkingWithArrays.js";
import express from "express";
import WorkingWithObjects from "./WorkingWithObjects.js";

export default function Lab5(app) {
  app.get("/lab5/welcome", (req, res) => {
    res.send("Welcome to Lab 5");
  });
  app.use(express.json());
  PathParameters(app);
  WorkingWithObjects(app);
  WorkingWithArrays(app);
}
