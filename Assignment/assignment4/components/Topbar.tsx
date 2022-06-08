import React, { useState, useEffect } from 'react'
import { getNetworkName } from '../constants/network-id';
import { getWalletAddress, getChainId, getEthereum } from '../services/wallet-service';

const Topbar = () => {
    const [address, setAddress] = useState<string | null>(null);
    const [network, setNetwork] = useState<string | null>(null);

    const accountData = async () => {
        const addr = getWalletAddress() //user address
        // console.log(addr);
        setAddress(addr)

        const chainId = await getChainId();
        setNetwork(chainId)
    }

    useEffect(() => {
        accountData()
        //show realtime
        const handleAccountChange = (addresses: string[]) => {
            setAddress(addresses[0]);
            accountData();
        };

        const handleNetworkChange = (networkId: string) => {
            setNetwork(networkId);
            accountData();
        };

        getEthereum()?.on("accountsChanged", handleAccountChange);

        getEthereum()?.on("chainChanged", handleNetworkChange);
    })
    return (
        <div className=' flex justify-between items-center px-8 py-2 bg-sky-100 shadow relative z-50 w-full'>
            <div className='flex'>
                {/* <img className='w-8 h-8 sm:w-[54px] sm:h-[54px] sm:mr-4 mr-2' src='/image 8-2.png' /> */}
                <div>
                    <p className=' text-bluedark text-4xl  font-extrabold'>BKF</p>
                    <p className=' text-bluedark text-lg '>Finance</p>
                </div>
            </div>
            <div className='flex flex-row text-center'>
                <div >
                    <select 
                    className='text-bluedark rounded-md bg-sky-200 px-4 py-2 shadow'>
                        <option>{getNetworkName(network)}</option>
                    </select>
                </div>
                <div>
                    <p className='px-4 bg-sky-900 text-white ml-4 rounded-md  py-2'>{address}</p>
                </div>
            </div>
        </div>
    )
}

export default Topbar