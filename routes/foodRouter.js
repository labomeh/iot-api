import express from "express";

import Food from "../models/foodModel.js";

const foodRouter = express.Router();

foodRouter
  .get("/", (req, res) => {
    Food.find().count().exec((err, cpt) => {
      res.json(cpt);
    });
    Food.deleteMany().exec();
  })
  .post("/", (req, res) => {
    const food = new Food({
      created_at: Date.now(),
    });

    food.save();
    res.status(201).send(food);
  });

export default foodRouter;
