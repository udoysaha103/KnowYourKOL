const mongoose = require('mongoose');

const unverifiedKOLschema = new mongoose.Schema({
    twitterName: { type: String, required: true},
    IRLname: { type: String, required: false},
    country: { type: String, required: true},
    photoPath: { type: String, required: false},

    walletAddress: { type: String, required: true},
    showAddress: { type: Boolean, required: true},
    signID: { type: String, required: true},

    twitterLink: { type: String, required: true},
    discordLink: { type: String, required: false},
    telegramLink: { type: String, required: false},
    youtubeLink: { type: String, required: false},
    streamLink: { type: String, required: false},

    generatedCode: { type: String, required: true},

    timestamp: { type: Date, default: Date.now }
})

const unverifiedKOLmodel = mongoose.model("unverifiedKOL", unverifiedKOLschema);
module.exports = unverifiedKOLmodel;