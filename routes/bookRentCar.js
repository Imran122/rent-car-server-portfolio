const express = require("express");
const { requireSignin } = require("../controllers/auth");
const router = express.Router();
// import controller
const {
  myBookingrentCarList,
  hostBookingRentCarList,
  acceptBookedCarForRent,
  bookCarReject,
  markCompleteBookedCarForRent,
  changeBookForRentStatus,
  changeBookForRentStatusFlase,
} = require("../controllers/bookRentCar");

router.get("/my-booking-rent-carist", requireSignin, myBookingrentCarList);
router.put(
  "/accept-booked-car-for-rent/:id",
  requireSignin,
  acceptBookedCarForRent
);
router.put(
  "/mark-complete-booked-car-forrent/:id",
  requireSignin,
  markCompleteBookedCarForRent
);
router.put(
  "/change-book-for-rent-status/:id",
  requireSignin,
  changeBookForRentStatus
);
router.put(
  "/change-book-for-rent-status-false/:id",
  requireSignin,
  changeBookForRentStatusFlase
);
router.delete("/book-car-reject/:id", requireSignin, bookCarReject);
router.get("/host-booking-rent-carlist", requireSignin, hostBookingRentCarList);

module.exports = router;
