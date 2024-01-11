const express = require("express");

const router = express.Router();
// import controller
const { requireSignin } = require("../controllers/auth");
const { favouriteUpdate, favouriteAllInformation, favouriteDelete } = require("../controllers/favourite");

router.post("/favourite-update", favouriteUpdate);
router.delete("/favourite-delete", favouriteDelete);
router.get("/favouriteallinfo/:id", favouriteAllInformation);
module.exports = router;
