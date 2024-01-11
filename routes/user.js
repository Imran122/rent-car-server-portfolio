const express = require("express");
const router = express.Router();
const Multer = require("multer");
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as you need
  },
});
// import controller
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const { read, update, changePassword } = require("../controllers/user");

router.get("/user/:id", requireSignin, read);
router.patch("/user/update", requireSignin, multer.single("ImageFile"), update);
router.patch("/user/changepassword", requireSignin, changePassword);

module.exports = router;
