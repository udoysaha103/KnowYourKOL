const mongoose = require('mongoose');

const verifiedKOLschema = new mongoose.Schema({
    twitterName: { type: String, required: true},
    IRLname: { type: String, required: false},
    country: { type: String, required: true},
    photoPath: { type: String, required: false},

    walletAddress: { type: String, required: true},
    showAddress: { type: Boolean, required: true},

    twitterLink: { type: String, required: true},
    discordLink: { type: String, required: false},
    telegramLink: { type: String, required: false},
    youtubeLink: { type: String, required: false},

    ROI1D: { type: Number, required: true},
    ROI7D: { type: Number, required: true},
    ROI30D: { type: Number, required: true},

    PnLtotal1D: { type: Number, required: true},
    PnLtotal7D: { type: Number, required: true},
    PnLtotal30D: { type: Number, required: true},

    avgHoldingDuration: { type: Number, required: true},

    walletBalance: { type: Number, required: true},

    cookerCount: { type: Number, required: true},
    farmerCount: { type: Number, required: true},

    PnLscore: { type: Number, required: true},
    sentimentScore: { type: Number, required: true},
    
    timestamp: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const verifiedKOLmodel = mongoose.model("verifiedKOL", verifiedKOLschema);
module.exports = verifiedKOLmodel;