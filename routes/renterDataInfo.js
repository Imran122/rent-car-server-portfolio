const express = require("express");
const { requireSignin } = require("../controllers/auth");
const router = express.Router();
// import controller
const {
  renterTodaysBookCar,
  renterBookDataInfo,
  carDetailsPageReview,
} = require("../controllers/renterDataInfo");

router.get("/renter-todays-bookcar", requireSignin, renterTodaysBookCar);
router.get("/renter-book-datainfo", requireSignin, renterBookDataInfo);
router.get("/car-details-page-review/:id", carDetailsPageReview);

module.exports = router;
