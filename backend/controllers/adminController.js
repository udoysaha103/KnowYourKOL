const userModel = require("../models/userModel.js");
const unverifiedKOLModel = require("../models/unverifiedKOLmodel.js");
const verifiedKOLModel = require("../models/verifiedKOLmodel.js");
const { verifyKOL } = require("./KOLregistration.js");

const verifyAdmin = async (req, res) => {
    userModel.findById(req.user._id)
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: "You need to sign in to access!" });
            }
            if (user._doc.isAdmin) {
                return res.status(200).json({ message: "You are an admin" });
            } else {
                return res.status(403).json({ message: "You are not authorized to access this resource" });
            }
        }
        ).catch((error) => {
            console.error("Error fetching user:", error);
            return res.status(500).json({ message: "Internal server error" });
        });
}

const getUnverifiedKOLs = async (req, res) => {
    try {
        const unverifiedKOLs = await unverifiedKOLModel.find({});
        res.status(200).json(unverifiedKOLs);
    }
    catch (error) {
        console.error("Error fetching unverified KOLs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getVerifiedKOLs = async (req, res) => {
    try {
        const verifiedKOLs = await verifiedKOLModel.find({});
        res.status(200).json(verifiedKOLs);
    }
    catch (error) {
        console.error("Error fetching verified KOLs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const editUnverifiedKOL = async (req, res) => {
    const { _id, twitterName, IRLname, country, walletAddress, showAddress, photoPath, twitterLink, discordLink, telegramLink, youtubeLink, streamLink } = req.body;

    // edit the unverified KOL
    try {
        const unverifiedKOL = await unverifiedKOLModel.findByIdAndUpdate(_id, { twitterName, IRLname, country, walletAddress, showAddress, photoPath, twitterLink, discordLink, telegramLink, youtubeLink, streamLink }, { new: true });
        if (!unverifiedKOL) {
            return res.status(404).json({ message: "Unverified KOL not found" });
        }
        res.status(200).json(unverifiedKOL);
    } catch (error) {
        console.error("Error verifying KOL:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { verifyAdmin, getUnverifiedKOLs, getVerifiedKOLs, editUnverifiedKOL };