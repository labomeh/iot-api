import express from "express";

import Food from "../models/foodModel.js";

const foodRouter = express.Router();

foodRouter
  .get("/", (req, res) => {
    Food.findOneAndDelete().exec((err, food) => {
      res.json(!!food);
    });
  })
  .post("/", (req, res) => {
    const food = new Food({
      created_at: Date.now(),
    });

    food.save();
    res.status(201).send(food);
  });

export default foodRouter;
