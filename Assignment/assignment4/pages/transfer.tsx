import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { getEthereum, getProvider, getWalletAddress, connectWallet, getChainId } from '../services/wallet-service'
import Topbar from '../components/Topbar'
import { getNetworkTokens } from '../constants/network-id'
import Menu from '../components/Menu'

const transfer = () => {
    const [address, setAddress] = useState<string | null>(null)
    const [network, setNetwork] = useState<string | null>(null);

    const [addressTransfer, setAddressTrans] = useState<string | null>(null)
    const [addrToken, setAddrToken] = useState('')
    const [amount, setAmount] = useState('')
    const [hash, setHash] = useState('')

    const [value, setValue] = useState('USDT')

    const transferBal = async () => {
        const abi = ["function transfer(address to, uint amount)"];
        const contract = new ethers.Contract(addrToken, abi, getProvider()!);
        const tokenSigner = contract.connect(getProvider()!.getSigner())
        const tokenAmount = ethers.utils.parseUnits(amount, 18) // decimal->number

        const transaction = await tokenSigner.transfer(addressTransfer, tokenAmount)
        // console.log(transaction.hash);
        setHash(transaction.hash)
    }

    const accountData = async () => {
        const addr = getWalletAddress() //user address
        // console.log(addr);
        setAddress(addr)

        const chainId = await getChainId();
        setNetwork(chainId);

    }

    const checkSymbol = (val:string) => {
        return getNetworkTokens(network).map((token) => {
            if (val === token.symbol) {
                setAddrToken(token.address)
                console.log(token.address , val)
            }
        })
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
        <div className="bg-slate-100 h-screen">
            {address ?
                (
                    <div>
                        <Topbar />
                        <Menu />
                        <div className='flex justify-center'>
                            <div className='border-2 rounded-lg border-blue-800 shadow-blue-500 shadow-sm justify-center mb-8 w-full mx-36'>
                                <div className='flex flex-col items-center'>
                                    <div className='bg-bluedark text-white px-4 py-2 m-4 rounded-md w-36 shadow-xl'>
                                        <p className='text-2xl font-extrabold  text-center '>Transfer</p>
                                    </div>
                                    <label className='text-left w-96 text-xs text-bluedark font-bold'>Address</label>
                                    <div className='flex flex-row my-4 text-bluedark border-blue-200 border-2 rounded-2xl shadow-sm py-5 w-96 h-24 justify-between'>
                                        <input
                                            className='w-full mr-2 bg-slate-100 rounded-lg text-2xl'
                                            placeholder=' 0x00'
                                            onChange={(e) => setAddressTrans(e.target.value)}
                                        />

                                        <select
                                            className='px-4 mx-2 rounded-lg bg-slate-200'
                                            onChange={(e) => { setValue(e.target.value) 
                                            checkSymbol(e.target.value)}}>
                                            {getNetworkTokens(network).map((token) => (
                                                <option value={token.symbol}>
                                                    {token.symbol}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* <input
                                        className='my-4 border-blue-200 border-2 rounded-2xl shadow-sm py-5 text-center text-3xl font-bold text-bluedark w-96 h-24'
                                    onChange={(e) => setAddrToken(e.target.value)} /> */}

                                    <label className='text-left w-96 text-xs text-bluedark font-bold'>Amount</label>
                                    <div
                                        className='flex flex-row my-4 w-96 h-24 '>
                                        <input
                                            className='w-full h-full bg-slate-100 text-bluedark shadow-sm text-2xl border-blue-200 border-2 rounded-2xl '
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder=' 0.0' />
                                    </div>
                                </div>
                                <div className='flex w-full justify-center'>
                                    <button
                                        className='my-2 bg-blue-400 rounded-md py-2 px-10 mx-4 shadow-lg text-white hover:text-blue-200 hover:bg-blue-600'
                                        onClick={transferBal}>Transfer</button>
                                </div>
                                <div className='flex w-full justify-end'>
                                    <a
                                        className='text-bluedark text-xs mb-8 mt-2 mx-10 hover:text-blue-400 font-semibold'
                                        target="_blank"
                                        href={`https://kovan.etherscan.io/tx/${hash}`}>View Hash</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                :
                (
                    <div className="flex h-screen w-full justify-center items-center bg-slate-100">
                        <button
                            className="bg-blue-500 rounded-lg text-white px-8 py-4 hover:bg-blue-300 cursor-pointer shadow-sm"
                            onClick={connectWallet}
                        >
                            Connect
                        </button>
                    </div>
                )
            }
        </div>

    )
}

export default transfer