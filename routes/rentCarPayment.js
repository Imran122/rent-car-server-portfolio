const express = require("express");
const Multer = require("multer");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as you need
  },
});

const { requireSignin } = require("../controllers/auth");
const router = express.Router();
// import controller
const { create } = require("../controllers/rentCarPayment");

router.post(
  "/rentcarpayment",
  requireSignin,

  create
);
module.exports = router;
