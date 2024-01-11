const express = require("express");
const { requireSignin } = require("../controllers/auth");
const router = express.Router();
// import controller
const {
  superAdminBalanceData,
  superAdminMostBookCar,
  adminMonthIncomeChart,
  supedAdminUserSellCarRentCarCount,
} = require("../controllers/superAdminDataInfo");

router.get("/super-admin-data-balance", requireSignin, superAdminBalanceData);
router.get("/super-admin-most-bookcar", requireSignin, superAdminMostBookCar);
router.get("/admin-month-income-chart", requireSignin, adminMonthIncomeChart);
router.get(
  "/supedadmin-user-sellcar-rentcarcount",
  requireSignin,
  supedAdminUserSellCarRentCarCount
);

module.exports = router;
