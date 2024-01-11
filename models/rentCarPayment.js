const mongoose = require("mongoose");

// rent car upload model schema

const rentCarPaymentScheama = new mongoose.Schema(
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
    rentTransactionId: {
      type: String,
      trim: true,
    },
    booktStatus: {
      type: String,
      default: "pending",
      trim: true,
    },
    firstname: {
      type: String,
      trim: true,
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
    carRegistrationState: {
      type: String,
      trim: true,
    },
    chargePlanName: {
      type: String,
    },

    deliveryCharges: {
      type: Number,
      trim: true,
    },
    insuranceName: {
      type: String,
      trim: true,
    },

    driverLicenseExpireDate: {
      type: Date,
      trim: true,
    },
    driverLicenseIssueDate: {
      type: Date,
      trim: true,
    },
    insuranceExpDate: {
      type: Date,
      trim: true,
    },
    tripStartDateTime: {
      type: Date,
      trim: true,
    },
    tripEndDateTime: {
      type: Date,
      trim: true,
    },
    driverLicenseNumber: {
      type: String,
      trim: true,
    },
    insurancePolicyNumber: {
      type: String,
      trim: true,
    },

    nameOnDriverLicense: {
      type: String,
      trim: true,
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
    dropupAddress: {
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
    hoursTotal: {
      type: Number,
      trim: true,
    },
    rentCharges: {
      type: Number,
      trim: true,
    },
    totalAmountCost: {
      type: Number,
      trim: true,
    },
    totalCostAll: {
      type: Number,
      trim: true,
    },
    carImage: {
      type: String,
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("rentCarPaymentData", rentCarPaymentScheama);
