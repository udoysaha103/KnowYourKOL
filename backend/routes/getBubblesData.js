const express = require("express");
const router = express.Router();
// const { getKOL, getKOLpnl, getKOLsentiment, getKOLoverall, searchKOL, getPnLrank, getSentimentRank, getRisingStars } = require("../controllers/getKOLcontroller");
const { scrapMemeCoins, getMemeCoins } = require("../controllers/bubbleController");


// get the top 100 meme coins sorted by market cap
router.get("/getBubblesData", getMemeCoins);

// scrap the meme coins
router.get("/scrapMemeCoins", scrapMemeCoins);

module.exports = router;