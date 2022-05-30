import axios from "axios";
import { useEffect, useState } from "react";

export default function Trade() {
    const [token1, setToken1] = useState('')
    const [token2, setToken2] = useState('')
    const [asks, setAsks] = useState<any>([])
    const [bids, setBids] = useState<any>([])
    const [amount, setAmount] = useState(0)
    const [value, setValue] = useState('usdt')
    const [order, setOrder] = useState<any>([])

    const fetchToken = async () => {
        const url = await axios(`https://api1.binance.com/api/v3/depth?symbol=` + token1 + token2)

        const asksData = url.data.asks.map((item: any, index: number) => {
            const asksPrice = Number(item[0])
            const asksAmount = Number(item[1])
            const asksTotal = asksPrice * asksAmount
            const newAsks = {
                price: asksPrice,
                amount: asksAmount,
                total: asksTotal
            }
            return newAsks
        })
        setAsks(asksData)


        const bidsData = url.data.bids.map((item: any, index: number) => {
            const bidsPrice = Number(item[0])
            const bidsAmount = Number(item[1])
            const bidsTotal = bidsPrice * bidsAmount
            const newBids = {
                price: bidsPrice,
                amount: bidsAmount,
                total: bidsTotal
            }
            return newBids
        })
        setBids(bidsData)

    }

    //Buy
    const buy = () => {
        console.log('buy');
        let _Amount = amount
        let coin: number = 0;
        if (value === 'usdt') {
            for (let i = 0; i < asks.length; i++) {
                const usdt = asks[i].price
                const btc = asks[i].amount
                const canBuy = _Amount / usdt
                if (_Amount > 0) {
                    const btcTotal = canBuy > btc ? btc + coin : canBuy + coin
                    _Amount = _Amount - (usdt * (btcTotal - coin))
                    coin = btcTotal
                }
            }
        }
        else if (value === 'btc') {
            for (let i = 0; i < asks.length; i++) {
                const usdt = asks[i].price
                const btc = asks[i].amount
                if (amount > 0) {
                    const usdtTotal = _Amount > btc ? coin+(usdt*btc) : coin+(_Amount*usdt)
                    _Amount = Math.abs(_Amount-btc)
                    coin=usdtTotal
                }
            }

        }
        orderList('buy', coin)
    }

    // Sell
    const sell = () => {
        let coin: number = 0;
        let _Amount = amount
        if (value === 'usdt') {
            for (let i = 0; i < bids.length; i++) {
                const usdt = bids[i].price
                const btc = bids[i].amount
                const canBuy = _Amount / usdt
                if (_Amount > 0) {
                    const btcTotal = canBuy > btc ? btc + coin : canBuy + coin
                    _Amount = _Amount - (usdt * (btcTotal - coin))
                    coin = btcTotal
                }
            }
        }
        else if (value === 'btc') {
            for (let i = 0; i < bids.length; i++) {
                const usdt = bids[i].price
                const btc = bids[i].amount
                if (amount > 0) {
                    const usdtTotal = _Amount > btc ? coin+(usdt*btc) : coin+(_Amount*usdt)
                    _Amount = Math.abs(_Amount-btc)
                    coin=usdtTotal
                }
            }
        }
        orderList('sell', coin)
    }

    const getAsks = () => {
        const dataAsks = [];
        if (asks.length > 0) {
            for (let i = 0; i < 5; i++) {
                dataAsks.push(
                    <tr key={i}>
                        <td>{asks[i].price}</td>
                        <td>{asks[i].amount}</td>
                        <td>{asks[i].total}</td>
                    </tr>
                )
            }
        }
        return dataAsks
    }

    const getBids = () => {
        const dataBids = []
        if (bids.length > 0) {
            for (let i = 0; i < 5; i++) {
                dataBids.push(
                    <tr key={i}>
                        <td>{bids[i].price}</td>
                        <td>{bids[i].amount}</td>
                        <td>{bids[i].total}</td>
                    </tr>
                )
            }
        }
        return dataBids
    }

    const orderList = (value: string, coin: number) => {
        const list = {
            id: '',
            date: '',
            symbol: '',
            type: '',
            price: 0,
            input: 0,
            output: 0
        }
        const time = new Date()
        const formatted = time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear() + ' ' + time.getHours() + ':' + time.getMinutes()
        const x = value == 'buy' ? asks : bids
        const weight = x.reduce((prev: any, current: any) => {
            return {
                total: parseFloat(prev.total) + parseFloat(current.total),
                amount: prev.amount + current.amount,
            }
        }, { total: 0, amount: 0 })
        const weightAvg = weight.total / weight.amount
        list.id = "#" + (order.length + 1)
        list.date = formatted
        list.symbol = token1 + "_" + token2
        list.type = value
        list.price = weightAvg
        list.input = amount
        list.output = coin

        setOrder([...order, list])
    }
    // console.log(order)
    const getOrder = () => {
        const dataList = []
        for (let i = 0; i < order.length; i++) {
            dataList.push(
                <tr>
                    <th>{order[i].id}</th>
                    <th>{order[i].date}</th>
                    <th>{order[i].symbol}</th>
                    <th>{order[i].type}</th>
                    <th>{order[i].price}</th>
                    <th>{order[i].input}</th>
                    <th>{order[i].output}</th>

                </tr>
            )
        }
        return dataList
    }

    const [idInterval, setIdInterval] = useState<any>()

    const handleFetch = () => {
        if (idInterval) {
            clearInterval(idInterval)
            setIdInterval(null)
        }
        const id = setInterval(() => {
            fetchToken()
        }, 1000)
        setIdInterval(id)
    }
    // useEffect(() => {
    //     fetchToken()
    // }, [asks, bids, order])
    return (
        <div>
            <div>
                <a href="/market-diff"> Market Diff </a><br />
                <a href="/chart"> Chart </a><br />
                <a href="/trade"> Trade </a><br />
            </div>

            <div>
                <h1>Chart</h1>
                <label>Token 1</label>
                <br />
                <input
                    type='text'
                    onChange={e => { setToken1(e.target.value.toUpperCase()); }}
                />
                <br />
                <label>Token 2</label>
                <br />
                <input
                    type='text'
                    onChange={e => { setToken2(e.target.value.toUpperCase()); }} />
                <br />
                <button onClick={handleFetch}>Fetch</button>
            </div>

            <div>
                <h1>Asks</h1>
                <table>
                    <thead>
                        <tr>
                            <th>{` Price (USDT) `}</th>
                            <th>{` Amount (BTC) `}</th>
                            <th> Total </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAsks()}
                    </tbody>
                </table>
            </div><br />

            <div>
                <h1>Bids</h1>
                <table>
                    <thead>
                        <tr>
                            <th>{` Price (USDT) `}</th>
                            <th>{` Amount (BTC) `}</th>
                            <th> Total </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getBids()}
                    </tbody>
                </table>
            </div><br />

            <div>
                <label>Amount</label><br />
                <input onChange={e => { setAmount(+e.target.value) }} />
                <label>
                    <select onChange={e => { setValue(e.target.value) }}>
                        <option value="usdt">USDT</option>
                        <option value="btc">BTC</option>
                    </select>
                </label><br />
                <button onClick={buy}>Buy</button>
                <button onClick={sell}>Sell</button>
            </div>
            <div>
                <h1>Order history</h1>
                <table>
                    <thead>
                        <tr>
                            <th> Order ID </th>
                            <th> Date </th>
                            <th> Symbol </th>
                            <th> Type </th>
                            <th> Price </th>
                            <th> Input </th>
                            <th> Output </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getOrder()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}