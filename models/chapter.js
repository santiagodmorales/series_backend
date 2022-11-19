const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  URL: { type: String, required: true },
  serie: { type: Schema.Types.ObjectId, ref: "Serie" },
});

module.exports = mongoose.model("Chapter", chapterSchema);
