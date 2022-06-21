import type { NextPage } from 'next'
import { useState } from 'react'
import { ethers, Wallet } from 'ethers'
import { JsonRpcProvider, JsonRpcSigner, Web3Provider } from '@ethersproject/providers'

let provider: JsonRpcProvider | Web3Provider
let signer: JsonRpcSigner | Wallet

const Home: NextPage = () => {
  const [walletAddr, setWalletAddr] = useState('');

  const connectWallet = async () => {
    provider = new ethers.providers.JsonRpcProvider();
    signer = provider.getSigner()

    const addr = await signer.getAddress()
    setWalletAddr(addr);
  }
  const gldToken = async()=>{
    
  }
  return (
    <div>
      <div>
        <h1>Address : {walletAddr}</h1>
      </div>
      <div>
        <button onClick={()=>connectWallet()}>connect</button>
      </div>
    </div>
  )
}

export default Home
