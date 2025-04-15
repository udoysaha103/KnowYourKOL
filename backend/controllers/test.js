const setTimoutPromise = (ms => new Promise(resolve => setTimeout(resolve, ms)));
const awaitFn = async () => {
    for (let i = 0; i < 10; i++) {
        console.log(i, "test");
        await setTimoutPromise(1000);
    }
}
// awaitFn();
(async () => {
    const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=solana-meme-coins&order=market_cap_desc&per_page=200&page=1&sparkline=false&price_change_percentage=1h,24h,7d,30d`;
    const res = await fetch(URL);
    const data = Array.from(await res.json())
    console.log(data);
})();