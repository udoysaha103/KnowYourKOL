// const cron = require("node-cron");
const { scrapMemeCoins } = require("../controllers/bubbleController");

// Schedule the cron job to run every 120 seconds
(async () => {
    console.log("✅ Cron job scheduled: Updates Meme Coin data!");
    while (true) {
        try {
            await scrapMemeCoins();
        } catch (err) {
            console.error("❌ Error in scrapMemeCoins", err.message);
        }
        await new Promise(resolve => setTimeout(resolve, 120000)); // 2 minutes interval
    }
})();
