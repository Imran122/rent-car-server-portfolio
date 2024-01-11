const express = require("express");

const router = express.Router();
// import controller
const { requireSignin } = require("../controllers/auth");
const { carListData, myCarListSeller } = require("../controllers/carListData");

router.get("/carlistdata", carListData);
router.get("/my-car-list-seller", requireSignin, myCarListSeller);

module.exports = router;
