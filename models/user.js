const mongoose = require("mongoose");
const crypto = require("crypto");
// user schema
const userScheama = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    role: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    accountType: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    bankname: {
      type: String,
    },
    instagram: {
      type: String,
    },
    contact_number: {
      type: String,
    },
    routingnumber: {
      type: Number,
    },
    bankaccountnumber: {
      type: Number,
    },
    address: {
      type: String,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    salt: String,
  },
  { timestamps: true }
);

// virtual
userScheama
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userScheama.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password; // true false
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", userScheama);
