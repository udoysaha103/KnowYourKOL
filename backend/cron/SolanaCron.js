// const cron = require("node-cron");
const { updateSolanaRate } = require("../controllers/UpdateSolana");

// Schedule the cron job to run every 106 seconds
// cron.schedule("*/106 * * * * *", updateSolanaRate);
setInterval(updateSolanaRate, 120000);

console.log("✅ Cron job scheduled: Updates SOLANA rate!");
