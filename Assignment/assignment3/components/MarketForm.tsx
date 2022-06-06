import React, { useEffect, useState } from "react";
import axios from "axios";

const MarketForm = () => {
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
      newList.sort(function (a: any, b: any) {
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
  const getList = (item: any, index: number) => {
    // if(list && list.length){
    return (
      <tr key={index}>
        <td className="p-2 sm:p-4 text-sm sm:text-base">{item.Token1}</td>
        <td className="p-2 sm:p-4 text-sm sm:text-base">{item.Token2}</td>
        <td className="p-2 sm:p-4 text-sm sm:text-base">{item.binancePrice}</td>
        <td className="p-2 sm:p-4 text-sm sm:text-base">{item.ftxPrice}</td>
        <td className="p-2 sm:p-4 text-sm sm:text-base">{item.diff}</td>
        <td className="p-2 sm:p-4 text-sm sm:text-base">
          <button
            className=" rounded-md bg-red-500 text-white w-20 h-8"
            onClick={() => deleteList(index)}>
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
    <div className="rounded-xl shadow-lg w-full h-84 sm:w-full sm:max-w-4xl p-2 sm:p-12 bg-white z-20 relative ">
      <form>
        <h3 className="text-2xl font-bold text-center my-5 sm:mb-7 sm:text-3xl">Market Diff</h3>
        <div className="flex flex-col justify-center mb-2 sm:mb-5 sm:flex-row sm:space-x-16 sm:px-20">
          <div className="w-full">
            <p className=" text-sm sm:text-lg font-bold mb-2">Token 1</p>
            <input
              type="text"
              placeholder="Fill in token"
              className="p-4 sm:p-2 rounded-md shadow sm:w-72 w-full mb-2"
              onChange={e => { setToken1(e.target.value.toUpperCase()); }}
            />
          </div>
          <div>
            <p className=" text-sm sm:text-lg font-bold mb-2">Token 2</p>
            <input
              type="text"
              placeholder="Fill in token"
              className="p-4 sm:p-2 rounded-md shadow sm:w-72 w-full mb-2"
              onChange={e => { setToken2(e.target.value.toUpperCase()); }}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="rounded-md bg-darkbg text-white sm:px-12 sm:py-4 px-12 py-4 my-2 sm:mt-2"
            onClick={fetchToken}
          >Fetch</button>
        </div>
      </form>
    </div>


  );
};

export default MarketForm;