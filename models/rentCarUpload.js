const mongoose = require("mongoose");

// rent car upload model schema

const rentCarScheama = new mongoose.Schema(
  {
    hostUserId: {
      type: String,
      trim: true,
    },
    firstname: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
    },
    requestStatus: {
      type: Boolean,
      default: false,
    },
    bookForRentStatus: {
      type: Boolean,
      default: false,
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
    authorizedMilage: {
      type: String,
      trim: true,
    },
    carInsuranceName: {
      type: String,
      trim: true,

      max: 32,
    },
    policyNumber: {
      type: String,
      trim: true,

      max: 32,
    },
    insuranceIssueDate: {
      type: Date,
      trim: true,
    },
    insuranceExpireDate: {
      type: Date,
      trim: true,
    },
    carAvailability: {
      type: String,
      trim: true,
    },
    carAvailabeDateStart: {
      type: Date,
      trim: true,
    },
    carAvailabeDateEnd: {
      type: Date,
      trim: true,
    },
    carAvailabeTimeStart: {
      type: String,
      trim: true,
    },
    carAvailabeTimeEnd: {
      type: String,
      trim: true,
    },
    chargePlanName: {
      type: String,
      trim: true,
    },
    rentCharges: {
      type: Number,
      trim: true,
    },
    milageAllowence: {
      type: Number,
      trim: true,
    },
    deliveryCharges: {
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

module.exports = mongoose.model("rentCarData", rentCarScheama);
