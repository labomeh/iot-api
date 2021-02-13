import express from "express";

import Data from "../models/dataModel.js";
import Food from "../models/foodModel.js";

const dataRouter = express.Router();

dataRouter
  .get("/", (req, res) => {
    Data.findOne()
      .sort({ created_at: -1 })
      .exec((err, { humidity, temperature, lux }) => {
        const weatherData = {
          fog: normalizeData(temperature, 19, 22, {exclude: true}) * normalizeData(humidity, 45, 70),
          rain:  normalizeData(temperature, 16, 20, {exclude: true, reverse: true}) * normalizeData(humidity, 35, 70),
          snow: normalizeData(temperature, 13, 17, {reverse: true}) * normalizeData(humidity, 30, 70),
          temperature: normalizeData(temperature, 10, 35),
          light: normalizeData(lux, 30, 110),
        };

        res.json(weatherData);
      });
  })
  .post("/", (req, res) => {
    const {
      humidityTemperatureMesure: { heatIndex, humidity, temperature },
      lightMesure: { c, cct, lux, rgb },
      food
    } = req.body;

    const data = new Data({
      created_at: Date.now(),
      heatIndex,
      humidity,
      temperature,
      c,
      cct,
      lux,
      rgb,
    });

    data.save();
    if(food > 0) {
      for(var i =0; i< food; i++) {
        const foodData = new Food({
          created_at: Date.now(),
        });
    
        foodData.save();
      }
      
    }
    res.status(201).send(data);
  });

const normalizeData = (data, min, max, {exclude, reverse} = {}) => {
  if (data < min || (exclude && ( reverse ? data < min : data > max) ) ) {
    return 0;
  } else if (reverse ? data < min : data > max) {
    return 1;
  }
  const value = (data - min) / (max - min);

  return reverse ? 1 - value : value;
};

export default dataRouter;
