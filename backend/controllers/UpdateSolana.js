import SOLconversionmodel from '../models/SOLconversionModel.js';
import axios from 'axios';

const updateSolanaRate = async () => {
    const BirdEye_API_SOL_2_USD = "https://public-api.birdeye.so/defi/price?address=So11111111111111111111111111111111111111112";
    const BirdEye_REQUEST_HEADER = {
        "accept": "application/json",
        "x-chain": "solana",
        "X-API-KEY": process.env.BirdEye_API_key
    };

    let SOL2USD_conversion_rate = 1;
    try {
        const BirdEye_response = await axios.get(BirdEye_API_SOL_2_USD, { headers: BirdEye_REQUEST_HEADER });
        SOL2USD_conversion_rate = BirdEye_response.data.data.value;
    } catch (error) {
        console.error(`Failed to fetch SOL to USD conversion rate: ${error.message}`);
    }

    // first check if there is already some data in the SOLconversion collection
    const SOLconversionData = await SOLconversionmodel.find();

    // if there is no data in the SOLconversion collection, create a new document
    if (SOLconversionData.length === 0) {
        try {
            await SOLconversionmodel.create({ sol2usdRate: SOL2USD_conversion_rate });
        } catch (error) {
            console.error(`Failed to create SOL to USD conversion rate: ${error.message}`);
        }
    }
    else {
        // The top row of the SOLconversion collection is the most recent rate. Update the rate and updatedAt.
        try {
            await SOLconversionmodel.updateOne({ _id: SOLconversionData[0]._id }, { sol2usdRate: SOL2USD_conversion_rate, updatedAt: Date.now() });
        } catch (error) {
            console.error(`Failed to update SOL to USD conversion rate: ${error.message}`);
        }
    }
}

export { updateSolanaRate };