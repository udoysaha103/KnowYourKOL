const fs = require('fs');
const path = require('path');

// Function to delete files starting with "playwright" in /tmp folder
const deletePlaywrightFiles = () => {
    const tmpDir = '/tmp';
    fs.readdir(tmpDir, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err.message}`);
            return;
        }

        files.forEach(file => {
            if (file.startsWith('playwright')) {
                const filePath = path.join(tmpDir, file);
                fs.rm(filePath, { recursive: true, force: true }, err => {
                    if (err) {
                        console.error(`Error deleting ${filePath}: ${err.message}`);
                    } else {
                        console.log(`Deleted: ${filePath}`);
                    }
                });
            }
        });
    });
}

// Run the function every 10 minutes
setInterval(deletePlaywrightFiles, 10 * 60 * 1000);

// Initial run
deletePlaywrightFiles();