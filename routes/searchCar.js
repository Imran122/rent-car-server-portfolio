const express = require("express");
const { requireSignin } = require("../controllers/auth");
const { searchCar } = require("../controllers/searchCar");
const router = express.Router();
// import controller

router.get("/search-car", searchCar);

module.exports = router;
