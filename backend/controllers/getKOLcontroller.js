const verifiedKOLmodel = require("../models/verifiedKOLmodel.js");
const unverifiedKOLmodel = require("../models/unverifiedKOLmodel.js");

const getKOL = async (req, res) => {
    const { id } = req.params;
    try {
        let KOL = await verifiedKOLmodel.findById(id);
        if(KOL){
            // if the KOL doesnt want to show his/her wallet address, we dont show it
            if(KOL.showAddress === false){
                KOL.walletAddress = "Hidden";
            }

            res.status(200).json({...KOL._doc});
            return;
        }
        KOL = await unverifiedKOLmodel.findById(id);
        if(!KOL){
            throw Error("KOL not found");
        }
        res.status(200).json({...KOL._doc});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// get the KOLs (Verified) sorted by PnL
const getKOLpnl = async (req, res) => {
    const {duration} = req.params;
    try {
        const KOLs = await verifiedKOLmodel.find().sort({ [`PnLtotal${duration}D`]: -1 });
        // if a KOL doesnt want to show his/her wallet address, we dont show it
        KOLs.forEach(KOL => {
            if(KOL.showAddress === false){
                KOL.walletAddress = "Hidden";
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
                KOL.walletAddress = "Hidden";
            }
        });

        res.status(200).json(KOLs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// get the overall sorted KOL list by first averaging the PnLscore and sentimentScore and then sorting by the average
const getKOLoverall = async (req, res) => {
    const { duration } = req.params;
    try {
        const KOLs = await verifiedKOLmodel.find();

        // if a KOL doesnt want to show his/her wallet address, we dont show it
        KOLs.forEach(KOL => {
            if(KOL.showAddress === false){
                KOL.walletAddress = "Hidden";
            }
        });

        const sortedKOLs = KOLs.sort((a, b) => {
            const avgA = 0.6*a[`PnLtotal${duration}D`] + 0.4*a.sentimentScore;
            const avgB = 0.6*b[`PnLtotal${duration}D`] + 0.4*b.sentimentScore;
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
                { walletAddress: { $eq: searchQuery } },
                { IRLname: { $regex: searchQuery, $options: "i" } }
            ]
        });

        // if a KOL doesnt want to show his/her wallet address, we dont show it
        KOLs.forEach(KOL => {
            if(KOL.showAddress === false){
                KOL.walletAddress = "Hidden";
            }
        });

        res.status(200).json(KOLs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getPnLrank = async (req, res) => {
    const { id, duration } = req.params;
    try {
        const KOLs = await verifiedKOLmodel.find().sort({ [`PnLtotal${duration}D`]: -1 });
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

const getRisingStars = async (req, res) => {
    // 1. get the overall sorted KOL list
    // 2. get the top 5 KOLs
    // 3. get the only ROI1D sorted KOL list
    // 4. exclude the top 5 KOLs from the ROI1D sorted KOL list
    // 5. get the top 4 from the remaining KOLs

    try {
        const KOLs = await verifiedKOLmodel.find();
        const sortedKOLs = KOLs.sort((a, b) => {
            // const avgA = 0.3*a.PnLscore1D + 0.7*a.sentimentScore;
            // const avgB = 0.3*b.PnLscore1D + 0.7*b.sentimentScore;
            const avgA = 0.5*(a.PnLtotal1D + a.sentimentScore);
            const avgB = 0.5*(b.PnLtotal1D + b.sentimentScore);
            return avgB - avgA;
        });
        const top5KOLs = sortedKOLs.slice(0, 5);

        const ROI1DsortedKOLs = KOLs.sort((a, b) => b.ROI1D - a.ROI1D);
        const remainingKOLs = ROI1DsortedKOLs.filter(KOL => !top5KOLs.includes(KOL));

        const top4RisingStars = remainingKOLs.slice(0, 4);

        res.status(200).json(top4RisingStars);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

module.exports = { getKOL, getKOLpnl, getKOLsentiment, getKOLoverall, searchKOL, getPnLrank, getSentimentRank, getRisingStars };