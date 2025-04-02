// schema for the user collection
const mongoose = require("mongoose");

// the basic schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    verificationStatus: { type: Boolean, required: true },
    timestamp: { type: Date, default: Date.now }
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;