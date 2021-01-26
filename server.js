import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import dataRouter from "./routes/dataRouter.js";
import foodRouter from "./routes/foodRouter.js";

mongoose.connect("mongodb+srv://User:IOT2020@iot.5sl3o.mongodb.net/IOT", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected");
});

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/data", dataRouter);
app.use("/api/food", foodRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
