import axios from "axios";
import { useState } from "react";

export default function Trade() {
    const [token1, setToken1] = useState('')
    const [token2, setToken2] = useState('')

    const url = axios.get(`https://api1.binance.com/api/v3/depth?symbol=${token1}${token2}`)

    const getBids = () => {
        const bids = url.then(
            //console.log()
        )
    }
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
                <button>Fetch</button>
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
                        
                    </tbody>
                </table>
            </div><br/>
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
                        
                    </tbody>
                </table>
            </div><br/>
            <div>
                <label>Amount</label><br/>
                <input/>
                <button>usdt</button><br/>
                <button>Buy</button>
                <button>Sell</button>
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

                    </tbody>
                </table>
            </div>
        </div>
    )
}