const { deleteTempFiles } = require('../controllers/deleteTempFiles');
deleteTempFiles();
setInterval(deleteTempFiles, 3600000); // 1 hour interval
console.log("✅ Cron job scheduled: Deletes temp files every hour!");