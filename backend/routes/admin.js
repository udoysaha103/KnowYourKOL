const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const { verifyAdmin, getUnverifiedKOLs, getVerifiedKOLs, editUnverifiedKOL, editVerifiedKOL, deleteVerifiedKOL } = require("../controllers/adminController.js");

router.get("/verifyAdmin", requireAuth, verifyAdmin);

router.get("/unverifiedKOLs", requireAuth, getUnverifiedKOLs);

router.get("/verifiedKOLs", requireAuth, getVerifiedKOLs);

router.post("/editUnverifiedKOL", [requireAuth, upload], editUnverifiedKOL);

router.post("/editVerifiedKOL", requireAuth, editVerifiedKOL);

router.post("/deleteVerifiedKOL", requireAuth, deleteVerifiedKOL);

module.exports = router;