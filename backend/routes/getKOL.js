const express = require("express");
const router = express.Router();
const { getKOL, getKOLpnl, getKOLsentiment, getKOLoverall, searchKOL, getPnLrank, getSentimentRank, getRisingStars } = require("../controllers/getKOLcontroller");


// get the overall sorted KOL list
router.get("/getKOLoverall/:duration", getKOLoverall);

// get the KOL list by pnl
router.get("/getKOLpnl/:duration", getKOLpnl);

// get the KOL list by sentiment
router.get("/getKOLsentiment", getKOLsentiment);

// search for a KOL by twitterName or walletAddress or IRLname
router.get("/search/:query", searchKOL);

// get the PnL based rank
router.get("/getPnLRank/:id/:duration", getPnLrank);

// get the sentiment based rank
router.get("/getSentimentRank/:id", getSentimentRank);

// get the rising stars
router.get("/getRisingStars", getRisingStars);

// get a specific KOL by id
router.get("/:id", getKOL);

module.exports = router;