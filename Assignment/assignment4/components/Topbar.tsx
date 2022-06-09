import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import { getNetworkName } from '../constants/network-id';
import { networkNames } from '../constants/network-name';
import { getWalletAddress, getChainId, getEthereum } from '../services/wallet-service';
import { ChainName } from '../types/token.type';

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

    // const addNetworkToWallet = async (item: ChainName) => {
    //     // if (val === item.chainName) {
    //     try {
    //         const wasAdded = await window.ethereum.request({
    //             method: "wallet_addEthereumChain",
    //             params: {
    //                 type: "ERC20", // Initially only supports ERC20, but eventually more!
    //                 options: {
    //                     chainId: item.chainId,
    //                     chainName: item.chainName,
    //                     nativeCurrency: {
    //                         name: item.nativeCurrency.name,
    //                         symbol: item.nativeCurrency.symbol,
    //                         decimals: 18,
    //                     },
    //                     rpcUrls: item.rpcUrls,
    //                     blockExplorerUrls: item.blockExplorerUrls
    //                 },
    //             },
    //         });
    //         if (wasAdded) {
    //             console.log("Thanks for your interest!");
    //         } else {
    //             console.log("Your loss!");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     // }
    // };

    interface addNetworkToWallet {
        chainId: string; // A 0x-prefixed hexadecimal string
        chainName: string;
        nativeCurrency: {
            name: string;
            symbol: string; // 2-6 characters long
            decimals: 18;
        };
        rpcUrls: string[];
        blockExplorerUrls?: string[];
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

        const handleAddNetwork = () => {
            addNetworkToWallet(networkNames)
        }

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
                        className='text-bluedark text-center rounded-md bg-sky-200 w-36 mr-2 py-2 shadow'
                    >
                        {networkNames.map((item) => (
                            <option value={item.chainName}>{item.chainName}</option>
                        )
                        )}
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