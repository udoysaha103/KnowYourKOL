const {updatePnLdata} = require("../controllers/updatePnLdata");
updatePnLdata();
setInterval(updatePnLdata, 300000);

console.log("✅ Cron job scheduled: Updates PnL data!");
