const bubbleModel = require("../models/bubbleModel");
const memeCoinModel = require("../models/memeCoinModel");

// scrapMemeCoins function
const setTimoutPromise = (ms => new Promise(resolve => setTimeout(resolve, ms)));
const scrapMemeCoins = async () => {
  const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=solana-meme-coins&order=market_cap_desc&per_page=200&page=1&sparkline=false&price_change_percentage=1h,24h,7d,30d`;
  try {
    const res = await fetch(URL);
    const data = Array.from(await res.json());
    console.log(`✅ Fetched ${data.length} meme coins from CoinGecko!`);
    if (data.length === 0) {
      throw new Error("No data found!");
    }
    let memeCoins = data.map((coin) => {
      return {
        bubbleName: coin.name,
        photoURL: coin.image,
        currentPrice: coin.current_price,
        mCap: coin.market_cap,
        FDV: coin.fully_diluted_valuation,
        // createdAt: null,
        // priceChange5M: null,
        priceChange1H: coin.price_change_percentage_1h_in_currency,
        // priceChnage6H: null,
        priceChange24H: coin.price_change_percentage_24h_in_currency,
        priceChange7D: coin.price_change_percentage_7d_in_currency,
        priceChange30D: coin.price_change_percentage_30d_in_currency,
        // coinAddress: null,
        coinID: coin.id
      };
    });
    console.log(`✅ ${memeCoins.length} meme coins fetched!`);
    // 1. delete all the coins that are not valid.
    memeCoins = memeCoins.filter(coin => Object.keys(coin).every(key => coin[key] !== null && coin[key] !== undefined && coin[key] !== ""));
    // 2. if any duplicate, delete the first one.
    console.log(`✅ ${memeCoins.length} meme coins after filter`);
    memeCoins = memeCoins.filter((coin, index, self) =>
      index === self.findIndex((t) =>
        t.bubbleName === coin.bubbleName
      ));

    // for the first time only
    for (let i = 0; i < memeCoins.length; i++) {
      // check if the coin is already in the database
      console.log(`Checking coin ${i + 1} of ${memeCoins.length}...`);
      const coin = await memeCoinModel.findOne({ coinID: memeCoins[i].coinID });
      // if the coin is not in the database, insert it
      if (coin === null) {
        const addressFetchingURL = `https://api.coingecko.com/api/v3/coins/${memeCoins[i].coinID}`;
        const res = await fetch(addressFetchingURL)
        const data = await res.json();
        memeCoins[i].coinAddress = data?.contract_address;
        try{
          const newCoin = await memeCoinModel.insertOne(memeCoins[i]);
        }catch(err) {
          console.log("❌ Error inserting coin: ", err);
          console.log(data);
        }
      // wait for 5 seconds before the next request
        await setTimoutPromise(10000);
      }
    }


      // // for each coin
      // for (let i = 0; i < memeCoins.length; i++) {
      //   // check if the coin is already in the database
      //   const coin = memeCoinModel.findOne({ coinID: memeCoins[i].coinID });

      //   // if the coin is not in the database, fetch the coin address and insert it into the database
      //   if (!coin) {
      //     const addressFetchingURL = `https://api.coingecko.com/api/v3/coins/${memeCoins[i].coinID}`;
      //     fetch(addressFetchingURL)
      //       .then((res) => res.json())
      //       .then((data) => {
      //         memeCoins[i].coinAddress = data?.platforms?.solana;
      //         const newCoin = new memeCoinModel(memeCoins[i]);
      //         newCoin.save()
      //           .then(() => {
      //             console.log(`✅ Coin ${coin.bubbleName} saved to database!`);

      //             // go to dexscreener and get the age, price change 5M and price change 6H
      //             const dexscreenerURL = `https://api.dexscreener.com/token-pairs/v1/solana/${memeCoins[i].coinAddress}`;
      //             fetch(dexscreenerURL)
      //               .then((res) => res.json())
      //               .then((data) => {
      //                 // take the first response
      //                 const response = data[0];

      //                 // if the response is null, delete the coin
      //                 if (response === null) {
      //                   memeCoins.splice(i, 1);
      //                   i--;
      //                 } else {
      //                   memeCoins[i].createdAt = response?.pairCreatedAt;
      //                   memeCoins[i].priceChange5M = response?.priceChange.m5;
      //                   memeCoins[i].priceChange6H = response?.priceChange.h6;
      //                 }

      //                 // wait for 5 seconds before the next request
      //                 setTimeout(() => {
      //                   console.log("Waiting for 5 seconds...");
      //                 }, 5000);
      //               })
      //               .catch((err) => console.log(err));
      //           })
      //           .catch((err) => console.log(err));
      //       })
      //       .catch((err) => console.log(err));
      //   }
      //   else { 
      //     // address already exists, transfering the data to the memeCoins array
      //     memeCoins[i].coinAddress = coin.coinAddress;

      //     // go to dexscreener and get the age, price change 5M and price change 6H
      //     const dexscreenerURL = `https://api.dexscreener.com/token-pairs/v1/solana/${memeCoins[i].coinAddress}`;
      //     fetch(dexscreenerURL)
      //       .then((res) => res.json())
      //       .then((data) => {
      //         // take the first response
      //         const response = data[0];

      //         // if the response is null, delete the coin
      //         if (response === null) {
      //           memeCoins.splice(i, 1);
      //           i--;
      //         } else {
      //           memeCoins[i].createdAt = response?.pairCreatedAt;
      //           memeCoins[i].priceChange5M = response?.priceChange.m5;
      //           memeCoins[i].priceChange6H = response?.priceChange.h6;
      //         }
      //       })
      //       .catch((err) => console.log(err));
      //   }
      // }

      // // console.log(memeCoins);

      // // make the bubbleModel collection empty
      // bubbleModel.deleteMany({})
      //   .then(() => {
      //     console.log("✅ bubbleModel collection is empty!");
      //   })
      //   .catch((err) => console.log(err));

      // // insert the top 100 meme coins based on Market Cap into the bubbleModel collection
      // memeCoins.map((coin) => { if (!coin.priceChange7D || !coin.priceChange1H || !coin.priceChange24H || !coin.priceChange30D || !coin.bubbleName || !coin.mCap || !coin.photoURL) console.log(coin) });
      // bubbleModel.insertMany(memeCoins.slice(0, 100))
      //   .then(() => {
      //     console.log("✅ memeCoins inserted into bubbleModel!");
      //   })
      //   .catch((err) => console.log(err));
  } catch (err) {
    console.log("❌ Error in scrapMemeCoins: ", err);
  }
}
// get the top 100 meme coins sorted by market cap
const getMemeCoins = async (req, res) => {
  bubbleModel
    .find()
    .sort({ mCap: -1 })
    .limit(100)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
};


module.exports = { scrapMemeCoins, getMemeCoins };
