const express = require("express");
const { requireSignin } = require("../controllers/auth");
const router = express.Router();
// import controller
const {
  superAdminUserListHost,
  superAdminUserListRenter,
  renterUserDelete,
  suspendUser,
  allBookingCarList,
  allReviewData,
  getReviewForEdit,
  updateReviewByAdmin,
  carDocumentListDataAdmin,
} = require("../controllers/superAdmin");

router.get("/all-review-data", requireSignin, allReviewData);
router.put("/update-review-by-admin", requireSignin, updateReviewByAdmin);
router.get("/get-review-for-edit/:id", requireSignin, getReviewForEdit);
router.get("/super-admin-user-host", requireSignin, superAdminUserListHost);
router.get("/all-booking-car-list", requireSignin, allBookingCarList);
router.get("/super-admin-user-renter", requireSignin, superAdminUserListRenter);
router.get(
  "/car-document-list-data-admin",
  requireSignin,
  carDocumentListDataAdmin
);

router.delete("/renter-host-delete", requireSignin, renterUserDelete);
router.put("/suspend-user", requireSignin, suspendUser);
module.exports = router;
