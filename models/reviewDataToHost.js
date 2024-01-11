const mongoose = require("mongoose");

// rent car upload model schema

const reviewDataToHostScheama = new mongoose.Schema(
  {
    rentCarId: {
      type: String,
      trim: true,
    },
    carUploadPersonHostId: {
      type: String,
      trim: true,
    },
    renterUserId: {
      type: String,
      trim: true,
    },
    hostFirstName: {
      type: String,
      trim: true,
    },
    hostLastName: {
      type: String,
      trim: true,
    },

    reviewStarToCar: {
      type: Number,
      trim: true,

      max: 42,
    },
    reviewStartToHost: {
      type: Number,
      trim: true,

      max: 42,
    },
    reviewTextToCar: {
      type: String,
    },
    reviewTextToHost: {
      type: String,
    },
    carMake: {
      type: String,
      trim: true,

      max: 42,
    },
    carModel: {
      type: String,
      trim: true,

      max: 42,
    },

    /*    tripStartDateTime: {
      type: Date,
      trim: true,
    },
    tripEndDateTime: {
      type: Date,
      trim: true,
    }, */

    hostProfileImage: {
      type: String,
    },
    rentCarImage: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reviewDataToHost", reviewDataToHostScheama);
