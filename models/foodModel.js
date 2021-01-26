import mongoose from "mongoose";

const Schema = mongoose.Schema;

const foodModel = new Schema({
  created_at: { type: Date },
});

export default mongoose.model("food", foodModel);
