const { firefox } = require('playwright');
const { rm, readdir } = require('fs/promises');
const { exec } = require('child_process');

function getProcessesByName(name) {
    return new Promise((resolve, reject) => {
        exec(`ps aux | grep ${name} | grep -v grep`, (error, stdout, stderr) => {
            if (error) {
                // Ignore grep's exit code 1 when no processes are found
                if (error.code === 1) return resolve([]);
                return reject(error);
            }

            const processes = stdout.trim().split('\n')
                .filter(line => line.trim() !== '')
                .map(line => {
                    const parts = line.trim().split(/\s+/);
                    return {
                        pid: parseInt(parts[1]),  // PID is the second column in ps aux
                        command: parts.slice(10).join(' '),  // The command is everything after column 10
                    };
                });

            resolve(processes);
        });
    });
}
const killProcess = (pid) => {
    return new Promise((resolve, reject) => {
        exec(`kill -9 ${pid}`, (error, stdout, stderr) => {
            if (error) return reject(error);
            resolve(stdout.trim());
        });
    }
    );
}

const SOLconversionModel = require('../models/SOLconversionModel.js');

const scrapData = async (accountAddress) => {
    const GMGN_API_URL = `https://gmgn.ai/sol/address/${accountAddress}`;

    let browser, context, page;
    try {
        browser = await firefox.launch({
            headless: true,
        });

        context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0'
        });

        page = await context.newPage();

        // console.log("Navigating to GMGN...");
        await page.goto(GMGN_API_URL, {
            waitUntil: "domcontentloaded", // Faster load detection
            timeout: 300000
        });

        // output page content to console
        // console.log(await page.content());

        // Wait for script tag to appear (adjust timeout if necessary)
        await page.waitForSelector('script#__NEXT_DATA__', { state: "attached", timeout: 300000 }); // wait for 5 minutes

        // Extract JSON data
        const jsonData = await page.evaluate(() => {
            const scriptTag = document.querySelector('script#__NEXT_DATA__');
            return scriptTag ? JSON.parse(scriptTag.innerText) : null;
        });


        if (!jsonData) {
            throw new Error("Failed to extract JSON data from the page.");
        }

        // Extract relevant data
        const user_data = jsonData.props.pageProps.addressInfo;
        let { pnl_1d, pnl_7d, pnl_30d, realized_profit_1d, realized_profit_7d, realized_profit_30d, balance, avg_holding_peroid, buy_1d, buy_7d, buy_30d, sell_1d, sell_7d, sell_30d, total_value } = user_data;

        // Fetch SOL to USD conversion rate
        let SOL2USD_conversion_rate = null;
        const SOLconversion = await SOLconversionModel.findOne();
        if (SOLconversion) {
            SOL2USD_conversion_rate = SOLconversion.sol2usdRate;
        }

        if (!SOL2USD_conversion_rate) {
            throw new Error("Failed to fetch SOL to USD conversion rate.");
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
        throw new Error(`Error during scraping: ${error.message}`);
    } finally {
        try {
            if (page) await page.close();
            if (context) await context.close();
            if (browser) await browser.close();
            try {
                const processes = await getProcessesByName('firefox');
                for (const process of processes) {
                    try {
                        await killProcess(process.pid);
                    } catch (error) {
                        throw new Error(`Error killing process with PID ${process.pid}: ${error.message}`);
                    }
                }
            } catch (error) {
                console.error(`Error killing firefox processes: ${error.message}`);
            }
            const tempPath = '/tmp/';
            const files = await readdir(tempPath, { withFileTypes: true });
            for (const file of files) {
                if (file.name.startsWith('playwright') || file.name.startsWith('puppeteer')) {
                    const filePath = `${tempPath}/${file.name}`;
                    await rm(filePath, { recursive: true, force: true });
                }
            }
        } catch (err) {
            console.error(`Error removing temporary directory: ${err.message}`);
        }
    }
}
module.exports = { scrapData };