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
//fetchAPI()

//2
function charInput() {
    fetch('https://api1.binance.com/api/v3/klines?interval=1h&symbol=BTCUSDT')
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length;) {
                //let j = 0;
                const openTime = data[i][0]
                const date = new Date(openTime);
                //const date1 = new Date(openTime).toISOString().slice(0,16).replace('T',' ')
                const hours = date.getHours();
                const minutes = "0" + date.getMinutes();
                //const formattedTime:string = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + hours + ':' + minutes as string
                const formattedTime: string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${hours}:${minutes}`
                console.log(formattedTime)
                const newObj = {
                    [formattedTime]: {
                        open: data[i][1],
                        high: data[i][2],
                        low: data[i][3],
                        close: data[i][4]
                    }
                }
                console.log(newObj)
                i++;
            }
            //console.log('length',data.length)
        })
}
//charInput();

//3
const orderBook = () => {
    function calculateOutputAmount(usdtAmount: number) {
        fetch('https://api1.binance.com/api/v3/depth?symbol=BTCUSDT')
            .then(res => res.json())
            .then((data) => {
                let coin: number = 0;
                let amount =usdtAmount ;
                data.asks.map((item: number[], index: number) => {
                    const usdt: number = +item[0];
                    const btc: number = +item[1];
                    const calBTC = amount / usdt;
                    if (amount > 0) {
                        //console.log(`coin 1 : Input ${amount} , coin:${coin}, item:${btc}`)
                        const coinTotal = calBTC > btc ? coin + btc : coin + calBTC;
                        amount = amount - (usdt * (coinTotal - coin));
                        coin = coinTotal;
                        //console.log(`coin 1 : Input ${amount} , coin:${coin} , item:${btc}`)

                    }
                })
                console.log(`Input USDT : ${usdtAmount}`)
                console.log(`Output BTC : ${coin} `)

            })
    }
    calculateOutputAmount(290000)

}
//orderBook()

