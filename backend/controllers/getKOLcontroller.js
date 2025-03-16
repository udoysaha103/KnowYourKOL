const verifiedKOLmodel = require("../models/verifiedKOLmodel.js");
const unverifiedKOLmodel = require("../models/unverifiedKOLmodel.js");

const getKOL = async (req, res) => {
    const { id } = req.params;
    try {
        let KOL = await verifiedKOLmodel.findById(id);
        if(KOL){
            // if the KOL doesnt want to show his/her wallet address, we dont show it
            if(KOL.showAddress === false){
                KOL.walletAddress = "[Hidden]";
            }

            res.status(200).json({...KOL._doc, verified: true});
            return;
        }
        KOL = await unverifiedKOLmodel.findById(id);
        if(!KOL){
            throw Error("KOL not found");
        }
        res.status(200).json({...KOL._doc, verified: false});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// get the KOLs (Verified) sorted by PnL
const getKOLpnl = async (req, res) => {
    try {
        const KOLs = await verifiedKOLmodel.find().sort({ PnLscore: -1 });
        // if a KOL doesnt want to show his/her wallet address, we dont show it
        KOLs.forEach(KOL => {
            if(KOL.showAddress === false){
                KOL.walletAddress = "[Hidden]";
            }
        });

        res.status(200).json(KOLs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// get the KOLs (Verified) sorted by sentiment
const getKOLsentiment = async (req, res) => {
    try {
        const KOLs = await verifiedKOLmodel.find().sort({ sentimentScore: -1 });

        // if a KOL doesnt want to show his/her wallet address, we dont show it
        KOLs.forEach(KOL => {
            if(KOL.showAddress === false){
                KOL.walletAddress = "[Hidden]";
            }
        });

        res.status(200).json(KOLs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// get the overall sorted KOL list by first averaging the PnLscore and sentimentScore and then sorting by the average
const getKOLoverall = async (req, res) => {
    try {
        const KOLs = await verifiedKOLmodel.find();

        // if a KOL doesnt want to show his/her wallet address, we dont show it
        KOLs.forEach(KOL => {
            if(KOL.showAddress === false){
                KOL.walletAddress = "[Hidden]";
            }
        });

        const sortedKOLs = KOLs.sort((a, b) => {
            const avgA = (a.PnLscore + a.sentimentScore) / 2;
            const avgB = (b.PnLscore + b.sentimentScore) / 2;
            return avgB - avgA;
        });
        res.status(200).json(sortedKOLs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const searchKOL = async (req, res) => {
    const searchQuery = req.params.query;

    // look for twitterName or walletAddress or IRLname of verified KOLs
    try {
        const KOLs = await verifiedKOLmodel.find({
            $or: [
                { twitterName: { $regex: searchQuery, $options: "i" } },
                { walletAddress: { $regex: searchQuery, $options: "i" } },
                { IRLname: { $regex: searchQuery, $options: "i" } }
            ]
        });

        // if a KOL doesnt want to show his/her wallet address, we dont show it
        KOLs.forEach(KOL => {
            if(KOL.showAddress === false){
                KOL.walletAddress = "[Hidden]";
            }
        });

        res.status(200).json(KOLs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getPnLrank = async (req, res) => {
    const { id } = req.params;
    try {
        const KOLs = await verifiedKOLmodel.find().sort({ PnLscore: -1 });
        const rank = KOLs.findIndex(KOL => KOL._id == id) + 1;
        res.status(200).json({ rank });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getSentimentRank = async (req, res) => {
    const { id } = req.params;
    try {
        const KOLs = await verifiedKOLmodel.find().sort({ sentimentScore: -1 });
        const rank = KOLs.findIndex(KOL => KOL._id == id) + 1;
        res.status(200).json({ rank });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { getKOL, getKOLpnl, getKOLsentiment, getKOLoverall, searchKOL, getPnLrank, getSentimentRank };