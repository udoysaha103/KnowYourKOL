const {updatePnLdata} = require("../controllers/updatePnLdata");

setInterval(updatePnLdata, 30000);

console.log("✅ Cron job scheduled: Updates PnL data!");
