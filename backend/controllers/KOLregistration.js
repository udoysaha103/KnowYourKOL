const unverifiedKOLmodel = require("../models/unverifiedKOLmodel.js");
const verifiedKOLmodel = require("../models/verifiedKOLmodel.js");
const { scrapData } = require("./scraper.js");

const submitVerificationRequest = async (req, res) => {
    console.log(req.file);
    const { twitterName, IRLname, country, photoPath, walletAddress, showAddress, signID, twitterLink, discordLink, telegramLink, youtubeLink, streamLink, generatedCode } = req.body;

    const unverifiedKOL = new unverifiedKOLmodel({ twitterName, IRLname, country, photoPath, walletAddress, showAddress, signID, twitterLink, discordLink, telegramLink, youtubeLink, streamLink, generatedCode });

    try {
        await unverifiedKOL.save();
        res.status(201).json({ message: "Verification request submitted successfully" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

const verifyKOL = async (req, res) => {
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
        const { ROI1D, ROI7D, ROI30D, PnLtotal1D, PnLtotal7D, PnLtotal30D, walletBalance, avgHoldingDuration } = scrapedData;

        const cookerCount = 0;
        const farmerCount = 0;
        const PnLscore = 0;
        const sentimentScore = 0;

        // create a new verifiedKOL document
        const verifiedKOL = new verifiedKOLmodel({ twitterName, IRLname, country, photoPath, walletAddress, showAddress, twitterLink, discordLink, telegramLink, youtubeLink, streamLink, ROI1D, ROI7D, ROI30D, PnLtotal1D, PnLtotal7D, PnLtotal30D, avgHoldingDuration, walletBalance, cookerCount, farmerCount, PnLscore, sentimentScore });


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