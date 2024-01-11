const express = require("express");
const { requireSignin } = require("../controllers/auth");
const router = express.Router();
// import controller
const {
  myCarListHost,
  hostBalanceData,
  mySellCarListHost,
  reviewToHostList,
} = require("../controllers/hostDataInfo");

router.get("/mysellcarlisthost", requireSignin, mySellCarListHost);
router.get("/mycarlisthost", requireSignin, myCarListHost);
router.get("/hostbalancedata", requireSignin, hostBalanceData);
router.get("/review-to-host-list", requireSignin, reviewToHostList);

module.exports = router;
