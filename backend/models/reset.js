const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    timestamp: { type: Date, default: Date.now }
})

const resetModel = mongoose.model("reset", codeSchema);
module.exports = resetModel;