const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const upload = require("../middlewares/fileUpload");
const { verifyAdmin, getUnverifiedKOLs, getVerifiedKOLs, editUnverifiedKOL, editVerifiedKOL, deleteVerifiedKOL, rejectUnverifiedKOL, getReviews } = require("../controllers/adminController.js");

router.get("/verifyAdmin", requireAuth, verifyAdmin);

router.get("/unverifiedKOLs", requireAuth, getUnverifiedKOLs);

router.get("/verifiedKOLs", requireAuth, getVerifiedKOLs);

router.post("/editUnverifiedKOL", [requireAuth, upload], editUnverifiedKOL);

router.post("/editVerifiedKOL", [requireAuth, upload] , editVerifiedKOL);

router.post("/deleteVerifiedKOL", requireAuth, deleteVerifiedKOL);

router.post("/rejectUnverifiedKOL", requireAuth, rejectUnverifiedKOL);

router.get("/getAllReviews", requireAuth, getReviews);

module.exports = router;