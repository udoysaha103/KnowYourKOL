const mongoose = require('mongoose');

const bubbleSchema = new mongoose.Schema({
    bubbleName: { type: String, required: true },
    photoURL: { type: String, required: true },
    coinAddress: { type: String, required: true },
    pairAddress: { type: String, required: true },

    currentPrice: { type: Number, required: true },
    mCap: { type: Number, required: true },
    FDV: { type: Number, required: true },
    createdAt: { type: Number, required: true },

    // priceChange5M: { type: Number, required: true },
    priceChange1H: { type: Number, required: true },
    priceChange6H: { type: Number, required: true },
    priceChange24H: { type: Number, required: true },
    priceChange7D: { type: Number, required: true },
    priceChange30D: { type: Number, required: true},

    timestamp: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const bubbleModel = mongoose.model("bubble", bubbleSchema);
module.exports = bubbleModel;