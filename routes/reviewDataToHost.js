const express = require("express");
const { requireSignin } = require("../controllers/auth");
const router = express.Router();
// import controller
const {
  getDataForPostReview,
  postReviewDataToHost,
  renterReviewList,
} = require("../controllers/reviewDataToHost");
router.get("/renter-review-list", requireSignin, renterReviewList);
router.get("/get-datafor-post-review/:id", requireSignin, getDataForPostReview);
router.post("/review-data-post", requireSignin, postReviewDataToHost);

module.exports = router;
