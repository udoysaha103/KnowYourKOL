const { updatePnLdata } = require("../controllers/updatePnLdata");
(async () => {
    // Initial call to updatePnLdata
    try{
        await updatePnLdata();
    }catch(error){
        console.error(`Error during initial PnL data update: ${error.message}`);
    }
})();
setInterval(async () => {
    console.log("Updating PnL data... (interval loop)");
    try{
        await updatePnLdata();
    }catch(error){
        console.error(`Error during PnL data update: ${error.message}`);
    }
}, 300000); // 5 minutes interval

console.log("✅ Cron job scheduled: Updates PnL data!");
