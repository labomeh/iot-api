import express from "express";

import Data from "../models/dataModel.js";

const dataRouter = express.Router();

dataRouter
  .get("/", (req, res) => {
    Data.findOne()
      .sort({ created_at: -1 })
      .exec((err, { humidity, temperature, lux }) => {
        const weatherData = {
          fog: normalizeData(humidity, 40, 70),
          rain: normalizeData(humidity, 15, 70),
          snow: 1 - normalizeData(temperature, 15, 20),
          temperature: normalizeData(temperature, 15, 35),
          light: normalizeData(lux, 30, 110),
        };

        res.json(weatherData);
      });
  })
  .post("/", (req, res) => {
    const {
      humidityTemperatureMesure: { heatIndex, humidity, temperature },
      lightMesure: { c, cct, lux, rgb },
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
    res.status(201).send(data);
  });

const normalizeData = (data, min, max) => {
  if (data < min) {
    return 0;
  } else if (data > max) {
    return 1;
  }

  return (data - min) / (max - min);
};

export default dataRouter;
