import { hexValue } from 'ethers/lib/utils';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import { getNetworkName } from '../constants/network-id';
import { networkNames } from '../constants/network-name';
import { getWalletAddress, getChainId, getEthereum } from '../services/wallet-service';
import { ChainName } from '../types/token.type';
import STORAGE_KEY from '../constants/storageKey';

const Topbar = () => {
    const [address, setAddress] = useState<string | null>(null);
    const [network, setNetwork] = useState<string | null>(null);
    // const test = localStorage.getItem(STORAGE_KEY.TOKEN_NAME)
    const [value, setValue] = useState()
    
    const accountData = async () => {
        const addr = getWalletAddress() //user address
        setAddress(addr)

        const chainId = await getChainId();
        setNetwork(chainId)
    }

    const formatChainParameter = (item: ChainName) => {
        const result = {
            chainId: hexValue(item.chainId),
            chainName: item.chainName,
            nativeCurrency: {
                name: item.nativeCurrency.name,
                symbol: item.nativeCurrency.symbol,
                decimals: item.nativeCurrency.decimals
            },
            rpcUrls: item.rpcUrls,
            blockExplorerUrls: item.blockExplorerUrls
        }
        return result;
    }

    const addNetworkToWallet = async (item: any) => {
        const chainParam = formatChainParameter(item)
        console.log('chain params', chainParam)
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: chainParam.chainId }]
            })
        }
        catch (switchError) {
            try {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [item],
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
    // const dataCheck = networkNames.find(item => item.chainName === value)
    // addNetworkToWallet(dataCheck)

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
    }, [network])

    useEffect(()=>{
        const initNetwork = async()=> {
            const chain = await getNetworkName(network)
        }
    },[])
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
                        // onChange={(e) => { setValue(e.target.value) }}
                        onChange={(e)=>{
                            const check = networkNames.find((item)=>item.chainName===e.target.value)
                            addNetworkToWallet(check)
                            console.log('check',check)
                        }}
                        className='text-bluedark text-center rounded-md bg-sky-200 w-36 mr-2 py-2 shadow'>
                        {networkNames.map((item) => (
                            <option value={item.chainName}>
                                {item.chainName}
                            </option>
                        ))}
                        {/* <option>{getNetworkName(network)}</option> */}
                    </select>
                    {getNetworkName(network)}
                </div>
                <div>
                    <p className='px-4 bg-sky-900 text-white ml-4 rounded-md  py-2'>{address?.slice(0, 5) + `...` + address?.slice(-4)}</p>
                </div>
            </div>
        </div>
    )

}

export default Topbar