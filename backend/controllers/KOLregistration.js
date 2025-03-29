const unverifiedKOLmodel = require("../models/unverifiedKOLmodel.js");
const verifiedKOLmodel = require("../models/verifiedKOLmodel.js");
const userModel = require("../models/userModel.js");
const { scrapData } = require("./scraper.js");

const submitVerificationRequest = async (req, res) => {
    const { twitterName, IRLname, country, walletAddress, showAddress, signID, twitterLink, discordLink, telegramLink, youtubeLink, streamLink } = req.body;
    const photoPath = `${process.env.SERVER_URL}/uploads/${req.file.filename}`;
    const generatedCode = Math.floor(100000 + Math.random() * 900000);

    const unverifiedKOL = new unverifiedKOLmodel({ twitterName, IRLname, country, photoPath, walletAddress, showAddress, signID, twitterLink, discordLink, telegramLink, youtubeLink, streamLink, generatedCode });

    try {
        await unverifiedKOL.save();
        res.status(201).json({ message: "Verification request submitted successfully", code: generatedCode });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

const verifyKOL = async (req, res) => {
    const user = await userModel.findById(req.user._id);
    // check if the user is an admin
    if (!user || !user.isAdmin) {
        return res.status(403).json({ message: "You are not authorized to verify KOLs" });
    }
    
    // get the id of the KOL to be verified
    const { KOL_id } = req.body;

    try {
        // find the KOL to be verified
        const KOL = await unverifiedKOLmodel.findById(KOL_id);

        // if the KOL does not exist
        if (!KOL) {
            return res.status(404).json({ message: "KOL not found" });
        }

        // Need these info from unverified KOL -> twitterName, IRLname, country, photoPath, walletAddress, showAddress, twitterLink, discordLink, telegramLink, youtubeLink
        // Need to add these info -> ROI1D, ROI7D, ROI30D, PnLtotal1D, PnLtotal7D, PnLtotal30D, avgHoldingDuration, walletBalance, cookerCount, farmerCount, PnLscore, sentimentScore
        // Need to add a timestamp
        const { twitterName, IRLname, country, photoPath, walletAddress, showAddress, twitterLink, discordLink, telegramLink, youtubeLink, streamLink } = KOL;
        const scrapedData = await scrapData(walletAddress);
        if (!scrapedData) {
            return res.status(404).json({ message: "Failed to scrape data" });
        }
        const { ROI1D, ROI7D, ROI30D, PnLtotal1D, PnLtotal7D, PnLtotal30D, walletBalance, avgHoldingDuration, buy1D, sell1D, buy7D, sell7D, buy30D, sell30D } = scrapedData;

        const cookerCount = 0;
        const farmerCount = 0;
        const reviewCount = 0;
        const PnLscore1D = 0;
        const PnLscore7D = 0;
        const PnLscore30D = 0;
        const sentimentScore = 0;
        const verifiedByAdmin = false;

        // create a new verifiedKOL document
        const verifiedKOL = new verifiedKOLmodel({ twitterName, IRLname, country, photoPath, walletAddress, showAddress, twitterLink, discordLink, telegramLink, youtubeLink, streamLink, ROI1D, ROI7D, ROI30D, PnLtotal1D, PnLtotal7D, PnLtotal30D, avgHoldingDuration, walletBalance, cookerCount, farmerCount, reviewCount, PnLscore1D, PnLscore7D, PnLscore30D, sentimentScore, verifiedByAdmin, buy1D, sell1D, buy7D, sell7D, buy30D, sell30D });


        // if the KOL exists, delete the KOL from the unverifiedKOL collection
        await unverifiedKOLmodel.findByIdAndDelete(KOL_id);


        // save the verifiedKOL document
        await verifiedKOL.save();

        // return a message to the frontend
        res.status(200).json({ message: "KOL verified successfully" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports = { submitVerificationRequest, verifyKOL };