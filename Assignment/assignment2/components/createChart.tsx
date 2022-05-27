import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from "react"
import axios from 'axios';

const ChartCreate = (props: any) => {
    const [token1, setToken1] = useState('')
    const [token2, setToken2] = useState('')
    const [list, setList] = useState<any>([])
    const fecthToken = async () => {
        const url = await axios.get(`https://api1.binance.com/api/v3/klines?interval=1h&symbol=${token1}${token2}`)
        const x = url.data.sort((a:any, b:any)=>{
            const aTime = a[0]
            const bTime = b[0] 
            return aTime- bTime
            // console.log(a[0])
        }).map((item: any, index: number) => {
            const openTime = item[0]
            const date = new Date(openTime*1000).toISOString().slice(0, 10).replace('T', ' ')
            // const date = new Date(openTime)
            // const format: string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
            const newObj = {
                time: date,
                open: Number(item[1] / 1000),
                high: Number(item[2] / 1000),
                low: Number(item[3] / 1000),
                close: Number(item[4] / 1000)
            }
            return newObj
        })
        setList(x)
        getChart()
        console.log(x)
        // console.log('list',list)
    }

    const getChart= ()=>{
        candle.setData(list)
        charts.timeScale().fitContent();
    }
    const [charts,setCharts]= useState<any>()
    const [candle,setCandle] = useState<any>()
    useEffect(()=>{
        const chart = createChart(document.body, { width: 720, height:420 });
        const candlestickSeries = chart.addCandlestickSeries();
        setCharts(chart)
        setCandle(candlestickSeries)
    },[])
    // candlestickSeries.setData(props.data)
    // chart.timeScale().fitContent();
    // console.log('prop', props.data)

    // const candlestickSeries = chart.addCandlestickSeries();
    // candlestickSeries.setData([
    //     { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
    //     { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
    //     { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
    //     { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
    //     { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
    //     { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
    //     { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
    //     { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
    //     { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
    //     { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
    // ]);

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
                    onChange={e => { setToken2(e.target.value.toUpperCase()); }}
                />
                <br />
                <button onClick={fecthToken}>Fetch</button>
            </div>
            <div>
            </div>
        </div>
    )
}
// export async function getServerSideProps(context:any) {

//     return {
//       props: {context}, // will be passed to the page component as props
//     }
//   }

export default ChartCreate