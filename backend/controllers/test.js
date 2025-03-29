const setTimoutPromise = (ms => new Promise(resolve => setTimeout(resolve, ms)));
const awaitFn = async () => {
    for (let i = 0; i < 10; i++) {
        console.log(i, "test");
        await setTimoutPromise(1000);
    }
}
awaitFn();