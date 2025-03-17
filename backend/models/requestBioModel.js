const mongoose = require('mongoose');

const requestBioSchema = new mongoose.Schema({
    kol_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    twitterName: { type: String, required: false },
    irlName: { type: String, required: false },
    location: { type: String, required: false },
    twitterLink: { type: String, required: false },
    discordLink: { type: String, required: false },
    telegramLink: { type: String, required: false },
    youtubeLink: { type: String, required: false },
    streamLink: { type: String, required: false },
})

const requestBioModel = mongoose.model("requestBioModel", requestBioSchema);
module.exports = requestBioModel;