import mongoose from "mongoose";

const Schema = mongoose.Schema;

const temperatureModel = new Schema({
  date: { type: Date },
  temperature: { type: Number },
});

export default mongoose.model("temperature", temperatureModel);
