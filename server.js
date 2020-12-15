import express from "express";
import mongoose from "mongoose";

import humidityRouter from "./routes/humidityRouter";
import brightnessRouter from "./routes/brightnessRouter";
import temperatureRouter from "./routes/temperatureRouter";

const db = mongoose.connect(
  "mongodb://User:IOT2020@iot.5sl3o.mongodb.net:27017/IOT"
);

const app = express();
const port = process.env.PORT || 4000;

app.use("/api/humidity", humidityRouter);
app.use("/api/brightness", brightnessRouter);
app.use("/api/temperature", temperatureRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
