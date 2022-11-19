const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Serie", serieSchema);
