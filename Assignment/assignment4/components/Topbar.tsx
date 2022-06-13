import React, { useEffect, useState } from 'react'
import { networkNames } from '../constants/network-name'
import { getChainId, getEthereum, getWalletAddress } from '../services/wallet-service';

const Topbar = () => {
    const [address, setAddress] = useState<string | null>(getWalletAddress());
    const [network, setNetwork] = useState<string>('');

    const initialNetwork = async () => {
        const chainId = await getChainId()
        setNetwork(chainId)
    }

    const addrWallet = async () => {
        const address = await getWalletAddress()
        setAddress(address)
    }

    const handleAddrWallet = async () => {
        getEthereum()?.on("accountsChanged", (addresses: string[]) => {
            setAddress(addresses[0])
        })
    }

    const handleChainChange = () => {

        getEthereum()?.on("chainChanged", (networkId: string) => {
            setNetwork(networkId)
        });
    }

    const handleSwitchNetwork = async (chain: string) => {
        const targetChain = networkNames.find((item) => item.chainId === chain)
        if (!targetChain) {
            return
        }
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: targetChain.chainId }]
            })
        }
        catch (switchError) {
            try {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [targetChain],
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
    useEffect(() => {
        console.log({ network });

    }, [network])

    useEffect(() => {
        //network
        initialNetwork()
        handleChainChange()
        //address
        addrWallet()
        handleAddrWallet()
    }, [])
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
                <div>
                    <select
                        value={network}
                        onChange={(e) => { handleSwitchNetwork(e.target.value) }}
                        className='text-bluedark text-center rounded-md bg-sky-200 w-36 mr-2 py-2 shadow'>
                        {networkNames.map((item,index) => (
                            <option key={index} value={item.chainId}>
                                {item.chainName}
                            </option>
                        ))}
                        {/* <option>{getNetworkName(network)}</option> */}
                    </select>
                </div>
                <div>
                    <p className='px-4 bg-sky-900 text-white ml-4 rounded-md  py-2'>{address?.slice(0, 5) + `...` + address?.slice(-4)}</p>
                </div>
            </div>
        </div>
    )
}

export default Topbar