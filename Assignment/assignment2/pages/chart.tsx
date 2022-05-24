import axios from "axios"
import { useState } from "react"

export default function Chart() {
    const [token1,setToken1] = useState('')
    const [token2,setToken2] = useState('')

    const fecthToken= async() =>{
        const url = await axios.get(`https://api1.binance.com/api/v3/avgPrice?symbol=` + token1 + token2)
    }
    return (
        <div>
            <div>
                <a href="/market-diff"> Market Diff </a>
                <a href="/chart"> Chart </a>
                <a href="/trade"> Trade </a>
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
        </div>
    )
}