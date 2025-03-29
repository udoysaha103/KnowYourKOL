// const cron = require("node-cron");
const { scrapMemeCoins } = require("../controllers/bubbleController");

// Schedule the cron job to run every 120 seconds
scrapMemeCoins();
setInterval(scrapMemeCoins, 120000);

console.log("✅ Cron job scheduled: Updates Meme Coin data!");
