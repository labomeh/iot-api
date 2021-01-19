import express from "express";

import Data from "../models/dataModel.js";

const temperatureRouter = express.Router();

temperatureRouter
  .get("/", (req, res) => {
    Data.findOne()
      .sort({ created_at: -1 })
      .exec((err, latestData) => {
        res.json(latestData);
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

export default temperatureRouter;
