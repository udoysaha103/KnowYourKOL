const verifiedKOLModel = require("../models/verifiedKOLmodel");
const unverifiedKOLModel = require("../models/unverifiedKOLmodel");
const requestBioModel = require("../models/requestBioModel");

const requestBioController = (req, res) => {
    const {kol_id, twitterName, irlName, location, twitterLink, discordLink, telegramLink, youtubeLink, streamLink } = req.body;
    let kol = verifiedKOLModel.findById(kol_id);
    if (!kol) {
        kol = unverifiedKOLModel.findById(kol_id);
    }
    if (!kol) {
        res.status(404).send({message: "KOL not found"});
        return;
    }
    const requestBio = new requestBioModel({
        kol_id,
        twitterName,
        irlName,
        location,
        twitterLink,
        discordLink,
        telegramLink,
        youtubeLink,
        streamLink
    });
    requestBio.save()
    .then(() => {
        res.status(200).send({message: "Request sent"});
    })
    .catch((err) => {
        res.status(500).send({message: err.message});
    });
}

module.exports = requestBioController;