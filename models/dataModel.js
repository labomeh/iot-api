import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dataModel = new Schema({
  created_at: { type: Date },
  temperature: { type: Number },
  humidity: { type: Number },
  heatIndex: { type: Number },
  lux: { type: Number },
  rgb: { type: String },
  c: { type: Number },
  cct: { type: Number },
});

export default mongoose.model("data", dataModel);
