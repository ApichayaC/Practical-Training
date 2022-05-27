import React, { useState ,useRef, useEffect} from "react"
import dynamic from "next/dynamic";
import axios from "axios";
const ChartCreate = dynamic(() => import('../components/createChart'), {
    ssr: false
});

export default function Chart() {
    // const [token1, setToken1] = useState('')
    // const [token2, setToken2] = useState('')
    // const [list, setList] = useState<any>([])
    // const fecthToken = async () => {
    //     const url = await axios.get(`https://api1.binance.com/api/v3/klines?interval=1h&symbol=${token1}${token2}`)
    //     const x = url.data.map((item: any, index: number) => {
    //         const openTime = item[0]
    //         // const date = new Date(openTime).toISOString().slice(0, 10).replace('T', ' ')
    //         const date = new Date(openTime)
    //         // const format: string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    //         const newObj = {
    //             time: {
    //                 year : date.getFullYear(),
    //                 month : date.getMonth(),
    //                 day : date.getDate()},
    //             open: Number(item[1] / 1000),
    //             high: Number(item[2] / 1000),
    //             low: Number(item[3] / 1000),
    //             close: Number(item[4] / 1000)
    //         }
    //         return newObj
    //     })
    //     setList(x)
    // }
    
    // console.log(list)
    return (
    <div>
        {/* <div>
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
                onChange={e => { setToken2(e.target.value.toUpperCase()); }}
                 />
            <br />
            <button onClick={fecthToken}>Fetch</button>
        </div> */}
        <ChartCreate/>
    </div>
    )
}