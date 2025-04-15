// const cron = require("node-cron");
const { updateSolanaRate } = require("../controllers/UpdateSolana");

// Schedule the cron job to run every 300 seconds
(async () => {
    console.log("✅ Cron job scheduled: Updates SOLANA rate!");
    while (true) {
        try {
            await updateSolanaRate();
        } catch (err) {
            console.error("❌ Error in updateSolanaRate: ", err);
        }
        await new Promise(resolve => setTimeout(resolve, 300000)); // 5 minutes interval
    }
})();