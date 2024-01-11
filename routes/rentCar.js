const express = require("express");
const { requireSignin } = require("../controllers/auth");
const router = express.Router();
// import controller
const {
  rentCarListInfo,
  rentCarDeny,
  rentCarApprove,
  rentCarDetails,
  approvedRentCarList,
} = require("../controllers/rentCar");

router.get("/rentcarlist", rentCarListInfo);
router.get("/approvedrentcarlist", approvedRentCarList);
router.get("/rentcardetails/:id", rentCarDetails);
router.put("/rentcarapprove", requireSignin, rentCarApprove);
router.delete("/rentcardeny", requireSignin, rentCarDeny);
module.exports = router;
