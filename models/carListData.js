const mongoose = require("mongoose");

// rent car upload model schema

const CarListScheama = new mongoose.Schema(
  {
    Make: {
      type: String,
      trim: true,
    },
    Model: {
      type: String,
      trim: true,
    },
    Year: {
      type: String,
      trim: true,
    },
    Car: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("carListData", CarListScheama);
