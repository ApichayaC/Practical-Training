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
                let j = 0;
                const openTime = data[i][j]
                const date = new Date(openTime);
                const hours = date.getHours();
                const minutes = "0" + date.getMinutes();
                //const formattedTime:string = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + hours + ':' + minutes as string
                //console.log(formattedTime)
                const formattedTime: string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${hours}:${minutes}`
                const newObj = {
                    formattedTime: formattedTime,
                    time: {
                        open: data[i][j + 1],
                        high: data[i][j + 2],
                        low: data[i][j + 3],
                        close: data[i][j + 4]
                    }
                }
                console.log(Object.values(newObj))
                i++;
            }
        })
}
//charInput();

//3
const orderBook = async () => {
    function calculateOutputAmount(usdtAmount: string) {
        fetch('https://api1.binance.com/api/v3/depth?symbol=BTCUSDT')
            .then(res => res.json())
            .then((data) => {
                const bids = data.bids
                const test: string = bids[0].find((usdt: string) => {
                    for (let i = 0 ; i < bids.length;) {
                        if (usdt[0] == usdtAmount) {
                            return console.log(usdt[0][1])
                        }
                        else {
                            //console.log(usdt.length)
                        }
                        i++;
                    }
                })
            })
    }
    console.log(calculateOutputAmount('29149.67000000'))

}
orderBook()

