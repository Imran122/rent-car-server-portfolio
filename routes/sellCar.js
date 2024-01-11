const express = require("express");
const { requireSignin } = require("../controllers/auth");
const router = express.Router();
// import controller
const { sellCarListInfo, sellCarDetails } = require("../controllers/sellCar");
router.get("/sellcarlist", sellCarListInfo);
router.get("/sellcardetails", sellCarDetails);
module.exports = router;
