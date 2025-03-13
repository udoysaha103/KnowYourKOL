const express = require("express");
const router = express.Router();
const { getKOLpnl, getKOLsentiment, getKOLoverall } = require("../controllers/getKOLcontroller");

// get the overall sorted KOL list
router.get("/getKOLoverall", getKOLoverall);

// get the KOL list by pnl
router.get("/getKOLpnl", getKOLpnl);

// get the KOL list by sentiment
router.get("/getKOLsentiment", getKOLsentiment);

module.exports = router;