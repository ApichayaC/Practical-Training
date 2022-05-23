import axios from "axios"
import { useEffect, useState } from "react"
import { GetServerSideProps } from "next"
import fetchApi from "./api/fetchApi"
import { url } from "inspector"

export default function MarketDiff() {
    const [token1, setToken1] = useState('')
    const [token2, setToken2] = useState('')
    const [ftx,setFtx] = useState()
    const [list, setList] = useState<string[]>([]);
    const [binance,setBinance] = useState()
    // type OHLC =[
    //     token1 : string,
    //     token2 :string,
    //     binancePrice : number,
    //     ftxPrice : number,
    //     diff: number
    // ]
    
        const fetchToken = async () => {
        // TODO: return if token1 === '' || token2 === '' 
        //const url1 = await axios.get('https://api1.binance.com/api/v3/avgPrice?symbol=BTCUSDT')
        if(Boolean(token1)&&Boolean(token2)){
            const url1 = await axios.get(`https://api1.binance.com/api/v3/avgPrice?symbol=` + token1 + token2)
            const url2 = await axios.get('/api/fetchApi',{
                params:{token1,token2}
            })
            const ftxPrice = url2.data.result.price
            const binancePrice =url1.data.price
            setBinance(binancePrice)
            setFtx(ftxPrice)
            const newList : number|string [] = [
                token1,token2,binancePrice,ftxPrice,binancePrice-ftxPrice
            ]
            setList(newList)
            console.log(url2.data.result)
            
        }
    }
    console.log('list',list)
    useEffect(()=>{
        fetchToken()
    },[])
    return (
        <div>
            <div>
                <a href="/market-diff"> Market Diff </a>
                <a href="/chart"> Chart </a>
                <a href="/trade"> Trade </a>
            </div>
            <div>
                <h1>Market Diff</h1>
                <label>Token 1</label>
                <input
                    type='text'
                    onChange={e => { setToken1(e.target.value.toUpperCase()) ;fetchToken()}}
                />
                <label>Token 2</label>
                <input
                    type='text'
                    onChange={e => { setToken2(e.target.value.toUpperCase());fetchToken() }} />
                <button onClick={fetchToken}>Fetch</button>
            </div>
            <div>
                <h1>List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Token1</th>
                            <th>Token2</th>
                            <th>Binance</th>
                            <th>FTX</th>
                            <th>Diff</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{list[0]}</td>
                        <td>{list[1]}</td>
                        <td>{list[2]}</td>
                        <td>{list[3]}</td>
                        <td>{list[4]}</td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}