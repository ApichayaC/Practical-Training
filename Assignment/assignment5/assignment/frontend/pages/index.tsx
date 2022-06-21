import type { NextPage } from 'next'
import { useState } from 'react'
import { ethers, Wallet } from 'ethers'
import { JsonRpcProvider, JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { GldToken } from "../../typechain";
import { abi } from '../src/contracts/abi.json'
import { address } from '../src/contracts/address.json'

let provider: JsonRpcProvider | Web3Provider
let signer: JsonRpcSigner | Wallet
let gldContract: GldToken

declare global {
  interface Window{
    ethereum : any;
  }
}

const Home: NextPage = () => {
  const [walletAddr, setWalletAddr] = useState('');
  const [result, setResult] = useState('');

  const connectWallet = async () => {
    provider = new ethers.providers.JsonRpcProvider();
    signer = provider.getSigner()

    const addr = await signer.getAddress()
    setWalletAddr(addr);
    gldContract = new ethers.Contract(address, abi, signer) as GldToken

  }
  const gldToken = async () => {
    console.log(gldContract.address);
    const addr = gldContract.address
    if (gldContract === undefined) {
      setResult('Have not result')
    }
    else {
      const bal = await gldContract.balanceOf(walletAddr)
      const symbol = await gldContract.decimals()
      console.log('Contract:' , gldContract);
      
      console.log(bal, symbol);

      setResult(await gldContract.address)
    }
  }
  const addTokenToWallet = async () => {
    const addr = gldContract.address ;
    const symbol = await gldContract.symbol() ;
    const decimal = await gldContract.decimals()
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: addr, // The address that the token is at.
            symbol: symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: decimal, // The number of decimals in the token
          }
        },
      });
      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <h3>Wallet Address : {walletAddr}</h3>
      </div>
      <div>
        <button onClick={() => connectWallet()}>connect</button>
      </div>
      <div>
        <p>Contract Address : {result}</p>
        <button onClick={() => gldToken()}>Result</button>
      </div>
      <div>
        <button onClick={()=>addTokenToWallet()}>Add</button>
      </div>
    </div>
  )
}

export default Home
