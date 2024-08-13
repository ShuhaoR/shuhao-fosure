const mongoose = require("mongoose");

const FundSchema = new mongoose.Schema({
  fundId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  netValue: { type: Number, required: true },
  cumulativeNetValue: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Fund = mongoose.model("Fund", FundSchema);

module.exports = Fund;
