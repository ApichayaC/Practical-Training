import axios from "axios"
import { useEffect, useState } from "react"
import fetchApi from "./api/fetchApi"

export default function MarketDiff() {
    const [token1, setToken1] = useState('')
    const [token2, setToken2] = useState('')
    const [ftx, setFtx] = useState()
    const [binance, setBinance] = useState()
    const [list, setList] = useState<any>([])
    const fetchToken = async () => {
        if (token1 !== '' && token2 !== '') {
            const url1 = await axios.get(`https://api1.binance.com/api/v3/avgPrice?symbol=` + token1 + token2)
            const url2 = await axios.get('/api/fetchApi', {
                params: { token1, token2 }
            })
            const ftxPrice = url2.data.result.price
            const binancePrice = url1.data.price
            const diff = binancePrice - ftxPrice
            setBinance(binancePrice)
            setFtx(ftxPrice)
            const newList = [{
                Token1: token1,
                Token2: token2,
                binancePrice: binancePrice,
                ftxPrice: ftxPrice,
                diff: diff,
            }, ...list]
            newList.sort(function(a: any, b: any){
                const atoken = a.Token1
                const btoken = b.Token1
                if (atoken > btoken) {
                    return 1
                }
                else if (atoken < btoken) {
                    return -1
                }
                else {
                    const atoken = a.Token2
                    const btoken = b.Token2
                    if (atoken > btoken) {
                        return 1
                    }
                    else if (atoken < btoken) {
                        return -1
                    }
                    else {
                        return 0;
                    }
                }
            })
            setList(newList)
           // console.log(list);

        }
        else {
            console.error('Error');
            alert("Please enter a Token")
        }
    }
    //console.log('list', list)

    const getList = (item: any, index: number) => {
        // if(list && list.length){
        return (
            <tr key={index}>
                <td>{item.Token1}</td>
                <td>{item.Token2}</td>
                <td>{item.binancePrice}</td>
                <td>{item.ftxPrice}</td>
                <td>{item.diff}</td>
                <td>
                    <button onClick={() => deleteList(index)}>
                        delete
                    </button>
                </td>

            </tr>)
        //     ))
        // }
    }
    const deleteList = (id: number) => {
        console.log({ id, list })
        const newList = list.filter((item: any, index: number) => id != index)
        // const x = list.splice(id,1)
        console.log({ newList });
        setList(newList)
    }

    return (
        <div>
            <div>
                <a href="/market-diff"> Market Diff </a><br />
                <a href="/chart"> Chart </a><br />
                <a href="/trade"> Trade </a><br />
            </div>
            <div>
                <h1>Market Diff</h1>
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
                        {
                            list && list.map((item: any, index: number) => {
                                return getList(item, index)
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}