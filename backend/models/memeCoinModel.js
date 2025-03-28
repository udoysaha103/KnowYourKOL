const mongoose = require('mongoose');

const memeCoinSchema = new mongoose.Schema({
    coinID: { type: String, required: true, unique: true },
    coinAddress: { type: String, required: true },

    timestamp: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const memeCoinModel = mongoose.model("memeCoin", memeCoinSchema);
module.exports = memeCoinModel;