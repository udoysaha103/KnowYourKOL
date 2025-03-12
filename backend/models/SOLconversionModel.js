const mongoose = require('mongoose');

const SOLconversionSchema = new mongoose.Schema({
    sol2usdRate: { type: Number, required: true },

    timestamp: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const SOLconversionModel = mongoose.model("SOLconversion", SOLconversionSchema);
module.exports = SOLconversionModel;