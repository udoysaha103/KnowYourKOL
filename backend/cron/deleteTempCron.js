const { deleteTempFiles } = require('../controllers/deleteTempFiles');
const path = '/tmp/snap-private-tmp/snap.chromium/tmp'
deleteTempFiles(path);
setInterval(() => deleteTempFiles(path), 3600000); // 1 hour interval
console.log("✅ Cron job scheduled: Deletes temp files every hour!");