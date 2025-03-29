const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const { verifyAdmin, getUnverifiedKOLs, getVerifiedKOLs, editUnverifiedKOL, editVerifiedKOL, deleteVerifiedKOL, getReviews } = require("../controllers/adminController.js");

router.get("/verifyAdmin", requireAuth, verifyAdmin);

router.get("/unverifiedKOLs", requireAuth, getUnverifiedKOLs);

router.get("/verifiedKOLs", requireAuth, getVerifiedKOLs);

router.post("/editUnverifiedKOL", requireAuth, editUnverifiedKOL);

router.post("/editVerifiedKOL", requireAuth, editVerifiedKOL);

router.post("/deleteVerifiedKOL", requireAuth, deleteVerifiedKOL);

router.get("/getAllReviews", requireAuth, getReviews);

module.exports = router;