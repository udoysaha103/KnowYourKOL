const { exec } = require('child_process');
const cron = require('node-cron');

// Schedule a task to run every 10 minutes
cron.schedule('*/10 * * * *', () => {
    console.log('Running cron job to delete temporary Playwright files...');
    
    // Command to remove all files starting with "playwright" in /tmp folder
    const command = 'rm -rf /tmp/playwright*';

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
        }
        console.log('Temporary Playwright files deleted successfully.');
    });
});