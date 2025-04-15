const { updatePnLdata } = require("../controllers/updatePnLdata");
(async () => {
    console.log("✅ Cron job scheduled: Updates PnL data!");
    while (true) {
        console.log("Updating PnL data... (while loop)");
        try {
            await updatePnLdata();
        } catch (error) {
            console.error(`Error during PnL data update: ${error.message}`);
        }
        await new Promise(resolve => setTimeout(resolve, 300000)); // 5 minutes interval
    }
})();

