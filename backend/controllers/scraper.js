const puppeteer = require('puppeteer');

const SOLconversionModel = require('../models/SOLconversionModel.js');

const scrapData = async (accountAddress) => {
    const GMGN_API_URL = `https://gmgn.ai/sol/address/${accountAddress}`;

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true, // Run with UI for debugging
            // args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();
        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        );

        // console.log("Navigating to GMGN...");
        await page.goto(GMGN_API_URL, {
            waitUntil: "domcontentloaded", // Faster load detection
            timeout: 60000 // Increase timeout to 60 seconds
        });

        // output page content to console
        // console.log(await page.content());

        // Wait for script tag to appear (adjust timeout if necessary)
        await page.waitForSelector('script#__NEXT_DATA__', { timeout: 30000 });

        // Extract JSON data
        const jsonData = await page.evaluate(() => {
            const scriptTag = document.querySelector('script#__NEXT_DATA__');
            return scriptTag ? JSON.parse(scriptTag.innerText) : null;
        });


        if (!jsonData) {
            console.error("Failed to extract user data.");
            return null;
        }

        // Extract relevant data
        const user_data = jsonData.props.pageProps.addressInfo;
        let { pnl_1d, pnl_7d, pnl_30d, realized_profit_1d, realized_profit_7d, realized_profit_30d, balance, avg_holding_peroid, buy_1d, buy_7d, buy_30d, sell_1d, sell_7d, sell_30d } = user_data;

        // Fetch SOL to USD conversion rate
        let SOL2USD_conversion_rate = null;
        const SOLconversion = await SOLconversionModel.findOne();
        if (SOLconversion) {
            SOL2USD_conversion_rate = SOLconversion.sol2usdRate;
        }

        if (!SOL2USD_conversion_rate) {
            console.error("Failed to fetch SOL to USD conversion rate.");
            return null;
        }

        // Convert PnL total values from USD to SOL
        const pnl_total_1d = realized_profit_1d / SOL2USD_conversion_rate;
        const pnl_total_7d = realized_profit_7d / SOL2USD_conversion_rate;
        const pnl_total_30d = realized_profit_30d / SOL2USD_conversion_rate;

        return {
            ROI1D: pnl_1d,
            ROI7D: pnl_7d,
            ROI30D: pnl_30d,
            PnLtotal1D: pnl_total_1d,
            PnLtotal7D: pnl_total_7d,
            PnLtotal30D: pnl_total_30d,
            buy1D: buy_1d,
            buy7D: buy_7d,
            buy30D: buy_30d,
            sell1D: sell_1d,
            sell7D: sell_7d,
            sell30D: sell_30d,
            walletBalance: balance,
            avgHoldingDuration: avg_holding_peroid,
        };
    } catch (error) {
        console.error(`Error during scraping: ${error.message}`);
        return null;
    } finally {
        if (browser) await browser.close();
    }
}

module.exports = { scrapData };