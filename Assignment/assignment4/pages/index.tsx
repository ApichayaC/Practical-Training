import type { NextPage } from 'next'
import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import { getWallet,connectWallet } from '../services/wallet-service';

const Home: NextPage = () => {
  const [address,setaddress] = useState<string|null>()
 
  useEffect(() => {
    setaddress(getWallet)
  }, [])
  
  return (
    <div>
      <div className='text-3xl'>hello</div>
      <button
        className='bg-blue-500 py-4 px-8 text-white rounded-lg'
        onClick={connectWallet}>
        Connect
      </button>
    </div>
  )
}

export default Home
