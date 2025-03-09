const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    email: { type: String, required: true },
    code: { type: Number, required: true },
    tries: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
})

const codeModel = mongoose.model("codes", codeSchema);
module.exports = codeModel;