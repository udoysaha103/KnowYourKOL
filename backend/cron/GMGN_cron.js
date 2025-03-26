const {updatePnLdata} = require("../controllers/updatePnLdata");
updatePnLdata(); // Run immediately on startup
setInterval(updatePnLdata, 300000);

console.log("✅ Cron job scheduled: Updates PnL data!");
