const {scrapData} = require('./scraper.js');
const verifiedKOLmodel = require('../models/verifiedKOLmodel.js');

const updatePnLdata = async () => {
    // get all the verified KOLs
    const KOLs = await verifiedKOLmodel.find();
    // for each KOL, scrape the data and update the PnLscore
    // Heuristic for the PnLscore: 
    //      The are two thing - ROI for 1D, 7D, 30D and those are already normalized, PnLtotal for 1D, 7D, 30D and those are not normalized.
    //      So, we need to normalize PnLtotal for 1D, 7D, 30D between 0 to 1 and then take the average of all 6 values.
    for (let KOL of KOLs) {
        const { walletAddress } = KOL;
        const scrapedData = await scrapData(walletAddress);
        if (!scrapedData) {
            console.error(`Failed to scrape data for KOL with wallet address: ${walletAddress}`);
            continue;
        }

        const { ROI1D, ROI7D, ROI30D, PnLtotal1D, PnLtotal7D, PnLtotal30D, walletBalance, avgHoldingDuration, buy1D, sell1D, buy7D, sell7D, buy30D, sell30D } = scrapedData;
        const PnLscore1D = (0.7 * ROI1D + 0.3 * (PnLtotal1D / 100));
        const PnLscore7D = (0.7 * ROI7D + 0.3 * (PnLtotal7D / 100));
        const PnLscore30D = (0.7 * ROI30D + 0.3 * (PnLtotal30D / 100));

        // Now save the scrapped data and the derived PnLscore to the verifiedKOL collection
        try {
            await verifiedKOLmodel.updateOne({ _id: KOL._id }, { ROI1D, ROI7D, ROI30D, PnLtotal1D, PnLtotal7D, PnLtotal30D, walletBalance, avgHoldingDuration, PnLscore1D, PnLscore7D, PnLscore30D, buy1D, sell1D, buy7D, sell7D, buy30D, sell30D,  updatedAt: Date.now() });
        } catch (error) {
            console.error(`Failed to update KOL with wallet address: ${walletAddress}`);
        }
    }        
}

module.exports = { updatePnLdata };