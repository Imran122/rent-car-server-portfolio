const mongoose = require("mongoose");

// rent car upload model schema
const sellCarScheama = new mongoose.Schema(
  {
    userId: {
      type: String,
      trim: true,

      max: 42,
    },
    firstname: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
    },
    carMake: {
      type: String,
      trim: true,

      max: 42,
    },
    contactNumber: {
      type: String,
      trim: true,
    },
    socialeMediaLink: {
      type: String,
      trim: true,
    },
    carModel: {
      type: String,
      trim: true,

      max: 42,
    },
    carMakeYear: {
      type: String,
      trim: true,
    },
    carRegistrationState: {
      type: String,
      trim: true,
      max: 42,
    },
    pickupAddress: {
      address: {
        type: String,
      },
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
    carLicenseNumber: {
      type: String,
      trim: true,

      max: 32,
    },

    carVinNumber: {
      type: String,
      trim: true,

      max: 32,
    },
    seatNumber: {
      type: Number,
    },
    doorNumber: {
      type: Number,
    },
    milesPerGallon: {
      type: Number,
    },
    fuelType: {
      type: String,
      trim: true,
    },
    bodyType: {
      type: String,
      trim: true,
    },
    transmissionType: {
      type: String,
      trim: true,
    },
    milageOnTheCar: {
      type: String,
      trim: true,
    },

    carCondition: {
      type: String,
      trim: true,
    },
    sellPrice: {
      type: Number,
      trim: true,
    },

    carDocumentPdf: {
      type: String,
    },
    carImage: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("sellCarData", sellCarScheama);
