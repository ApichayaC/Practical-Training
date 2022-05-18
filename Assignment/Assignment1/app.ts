//1
const fetchAPI = () => {
    // const FTX = await fetch(`https://ftx.com/api/markets/BTC/USDT`)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(res)
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
    // const Binance = await fetch(`https://api1.binance.com/api/v3/avgPrice?symbol=BTCUSDT`)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(res)
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });


    try {
        Promise.all([
            fetch("https://ftx.com/api/markets/BTC/USDT").then(res => res.json()),
            fetch("https://api1.binance.com/api/v3/avgPrice?symbol=BTCUSDT").then(res => res.json()),
        ]).then((res => {
            const FTXPrice = res[0].result.price;
            const binancePrice = res[1].price;
            const result = FTXPrice - binancePrice;
            const percentage = (result / binancePrice) * 100;
            console.log('FTX BTC Price :', FTXPrice)
            console.log('Binance BTC Price :', binancePrice)
            console.log(`Diff : ${result} USDT (${percentage}%)`)

        }))

    }
    catch (err) {
        console.log(err);
    };
}
fetchAPI()

//2
function charInput(){
    fetch('https://api1.binance.com/api/v3/klines?interval=1h&symbol=BTCUSDT')
    .then(res=>res.json())
    .then(data=>{
        const openTime= data[0][0] 
        const date = new Date(openTime);
        const hours = date.getHours();
        const minutes = "0"+date.getMinutes();
        const formattedTime = date +' '+ hours+':'+minutes as string
        console.log(formattedTime)
      
    })
}
//charInput();

