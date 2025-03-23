const bubbleModel = require("../models/bubbleModel");

// scrapMemeCoins function
const scrapMemeCoins = async () => {
  const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=solana-meme-coins&order=market_cap_desc&per_page=200&page=1&sparkline=false&price_change_percentage=1h,24h,7d`;

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      let memeCoins = data.map((coin) => {
        return {
          bubbleName: coin.name,
          photoURL: coin.image,
          mCap: coin.market_cap,
          priceChange1H: coin.price_change_percentage_1h_in_currency,
          priceChange24H: coin.price_change_percentage_24h_in_currency,
          priceChange7D: coin.price_change_percentage_7d_in_currency,
        };
      });

      // 1. delete all the coins that do not have a photoURL
      memeCoins = memeCoins.filter((coin) => coin.photoURL !== null || coin.photoURL !== "");
      // 2. if any duplicate coins, keep the first one
      memeCoins = memeCoins.filter(
        (coin, index, self) =>
          index === self.findIndex((t) => t.bubbleName === coin.bubbleName)
      );
      //   there should be a vali name
      memeCoins = memeCoins.filter((coin) => coin.bubbleName !== null);
      // there should be a valid market cap
      memeCoins = memeCoins.filter((coin) => coin.mCap !== null);
      // there should be a valid price change 1H
      memeCoins = memeCoins.filter((coin) => coin.priceChange1H !== null);
      // there should be a valid price change 24H
      memeCoins = memeCoins.filter((coin) => coin.priceChange24H !== null);
      // there should be a valid price change 7D
      memeCoins = memeCoins.filter((coin) => coin.priceChange7D !== null);

      //   console.log(memeCoins);

      // make the bubbleModel collection empty
      bubbleModel.deleteMany({})
        .then(() => {
          console.log("✅ bubbleModel collection is empty!");
        })
        .catch((err) => console.log(err));

      // insert the top 100 meme coins based on Market Cap into the bubbleModel collection
      memeCoins.map((coin) => { if (!coin.priceChange7D || !coin.priceChange1H || !coin.priceChange24H || !coin.bubbleName || !coin.mCap || !coin.photoURL) console.log(coin) });
      bubbleModel.insertMany(memeCoins.slice(0, 100))
        .then(() => {
          console.log("✅ memeCoins inserted into bubbleModel!");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

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
