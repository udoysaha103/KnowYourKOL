const path = require("path");
const multer = require("multer");
const imageFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: File upload only supports the following filetypes - " + filetypes);
  }
};
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: 1000000 },
}).single("imageFile");
// Wrapper middleware to handle errors properly
const uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      // Handle different types of errors
      if (err instanceof multer.MulterError) {
        // Multer errors (like file size limit exceeded)
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(413).send({
            success: false,
            message: "File size too large. Maximum 1MB allowed."
          });
        }
        return res.status(400).send({
          success: false,
          message: err.message || "File upload error"
        });
      } 
      else {
        // Other unexpected errors
        console.error("File upload error:", err);
        return res.status(500).send({
          success: false,
          message: err
        });
      }
    }
    
    // No errors, proceed to next middleware
    next();
  });
};

module.exports = uploadMiddleware;