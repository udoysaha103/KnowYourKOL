const { rmdir } = require('fs').promises;
const deleteTempFiles = async (path) => {
  // console.log(`Deleting temp files from ${path}`);
  try {
    await rmdir(path, { recursive: true, force: true });
    console.log(`successfully deleted ${path}`);
  } catch (error) {
    console.error('there was an error:', error.message);
  }
}

module.exports = { deleteTempFiles };