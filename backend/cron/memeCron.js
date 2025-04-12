// const cron = require("node-cron");
const { scrapMemeCoins } = require("../controllers/bubbleController");

// Schedule the cron job to run every 120 seconds
(async () => {
    // Initial call to scrapMemeCoins
    try{
        await scrapMemeCoins();
    }catch(err){
        console.error("❌ Error in initial scrapMemeCoins call: ", err);
    }
})();
setInterval(async () => {
    try{
        await scrapMemeCoins();
    }catch(err){
        console.error("❌ Error in scrapMemeCoins: ", err);
    }
}, 120000); // 2 minutes interval

console.log("✅ Cron job scheduled: Updates Meme Coin data!");
