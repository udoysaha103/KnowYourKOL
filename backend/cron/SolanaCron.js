// const cron = require("node-cron");
const { updateSolanaRate } = require("../controllers/UpdateSolana");

// Schedule the cron job to run every 300 seconds
// cron.schedule("*/106 * * * * *", updateSolanaRate);
updateSolanaRate();
setInterval(updateSolanaRate, 300000);

console.log("✅ Cron job scheduled: Updates SOLANA rate!");
