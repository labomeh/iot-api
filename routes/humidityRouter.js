import express from "express";
const humidityRouter = express.Router();
humidityRouter.get("/", (req, res) => {
  //res.json(...)
});
export default humidityRouter;
