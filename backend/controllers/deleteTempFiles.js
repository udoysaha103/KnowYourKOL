const { unlink } = require('fs').promises;
const deleteTempFiles = async (path) => {
  // console.log(`Deleting temp files from ${path}`);
  try {
    await unlink(path);
    console.log(`successfully deleted ${path}`);
  } catch (error) {
    console.error('there was an error:', error.message);
  }
}

module.exports = { deleteTempFiles };