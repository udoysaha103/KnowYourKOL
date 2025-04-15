const bubbleModel = require("../models/bubbleModel");
const memeCoinModel = require("../models/memeCoinModel");

// scrapMemeCoins function
const scrapMemeCoins = async () => {
  const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=solana-meme-coins&order=market_cap_desc&per_page=200&page=1&sparkline=false&price_change_percentage=1h,24h,7d,30d`;
  const res = await fetch(URL);
  const data = Array.from(await res.json())
    .filter((coin, index, self) => index === self.findIndex((t) => t.name === coin.name)); // filter out duplicates

  if (data.length === 0) {
    throw new Error("No data found!");
  }

  let memeCoins = data.map((coin) => ({
    bubbleName: coin.name,
    photoURL: coin.image,
    currentPrice: coin.current_price,
    mCap: coin.market_cap,
    FDV: coin.fully_diluted_valuation,
    createdAt: null,
    priceChange5M: null,
    priceChange1H: coin.price_change_percentage_1h_in_currency,
    priceChange6H: null,
    priceChange24H: coin.price_change_percentage_24h_in_currency,
    priceChange7D: coin.price_change_percentage_7d_in_currency,
    priceChange30D: coin.price_change_percentage_30d_in_currency,
    coinAddress: null,
    pairAddress: null,
    coinID: coin.id,
  }));

  console.log(`✅ ${memeCoins.length} meme coins fetched!`);

  // for each coin fetch coinAddress from coingecko
  for (let i = 0; i < memeCoins.length; i++) {
    try {
      // check if the coin is already in the database
      const coin = await memeCoinModel.findOne({ coinID: memeCoins[i].coinID });
      // console.log(`Checking coin ${i + 1} of ${memeCoins.length}...`);

      // if the coin is not in the database, fetch the coin address and insert it into the database
      if (coin === null) {
        const addressFetchingURL = `https://api.coingecko.com/api/v3/coins/${memeCoins[i].coinID}`;
        const res = await fetch(addressFetchingURL);
        const data = await res.json();
        if (!data?.contract_address) {
          throw new Error("No contract address found!");
        }
        memeCoins[i].coinAddress = data.contract_address;
        try {
          await memeCoinModel.create(memeCoins[i]);
        } catch (err) {
          throw new Error("Error inserting coin into database: ", err);
        }
      }
      else {
        // address already exists, transfering the data to the memeCoins array
        memeCoins[i].coinAddress = coin.coinAddress;
      }

      // go to dexscreener and get the age, price change 5M and price change 6H
      const dexscreenerURL = `https://api.dexscreener.com/token-pairs/v1/solana/${memeCoins[i].coinAddress}`;
      try {
        const res = await fetch(dexscreenerURL);
        const data = await res.json();
        // if the data is not empty, get the age, price change 5M and price change 6H, pair address
        if (data && data.length > 0) {
          // take the first object in the data array
          const firstObject = data[0];
          if (firstObject.pairAddress && firstObject.pairCreatedAt && firstObject.priceChange?.h6) {
            memeCoins[i].pairAddress = firstObject.pairAddress;
            memeCoins[i].createdAt = firstObject.pairCreatedAt;
            // memeCoins[i].priceChange5M = firstObject?.priceChange?.m5;
            memeCoins[i].priceChange6H = firstObject.priceChange?.h6;
          } else {
            throw new Error(`Not every value is present for the coin ${memeCoins[i].bubbleName}`);
          }
        }
        console.log(`✅ Data for coin ${memeCoins[i].bubbleName} fetched!`);
      } catch (err) {
        throw new Error("Error fetching valid data from dexscreener: ", err.message);
      }

    } catch (err) {
      console.error(`❌ Error fetching coin data for coin ${memeCoins[i].bubbleName}: `, err.message);
      memeCoins.splice(i, 1);
      i--; // Adjust the index after removal
    }
    // wait for 7 seconds before the next request
    await new Promise((resolve) => setTimeout(resolve, 7000));
  }

  console.log(`✅ ${memeCoins.length} meme coins after filter`);

  // console.log(memeCoins);
  if(memeCoins.length >= 100){
    // make the bubbleModel collection empty
    await bubbleModel.deleteMany({})
    console.log("✅ bubbleModel collection is empty!");

    await bubbleModel.insertMany(memeCoins.slice(0, 100))
    console.log("✅ memeCoins inserted into bubbleModel!");
  }
};


// get the top 100 meme coins sorted by market cap
const getMemeCoins = async (req, res) => {
  try {
    const data = await bubbleModel.find().sort({ mCap: -1 }).limit(100)
    res.status(200).json(data);
  }
  catch (err) {
    console.error("❌ Error in getMemeCoins: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { scrapMemeCoins, getMemeCoins };
