import React, { useEffect, useState } from 'react'
import { ethers, Signer } from 'ethers';
import { getBalance, getChainId, getProvider, getWalletAddress, getEthereum } from '../services/wallet-service';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import { getNetworkCurr, getNetworkTokens } from '../constants/network-id';
import { Token } from '../types/token.type';

const WalletForm = () => {


    const [address, setAddress] = useState<string | null>(null);
    const [network, setNetwork] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);

    const [tokenBalances, setTokenBalances] = useState<Record<string, string>>(
        {}
    );

    const getTokenBalance = async (tokenAddress: string, ownerAddress: string) => {
        const abi = ["function balanceOf(address owner) view returns (uint256)"];
        const contract = new ethers.Contract(tokenAddress, abi, getProvider()!);
        return contract.balanceOf(ownerAddress);
    };

    // add token to wallet ,onClick img     
    const addTokenToWallet = async (token: Token) => {
        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20", // Initially only supports ERC20, but eventually more!
                    options: {
                        address: token.address, // The address that the token is at.
                        symbol: token.symbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: token.decimals, // The number of decimals in the token
                        image: token.imageUrl, // A string url of the token logo
                    },
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

    const accountData = async () => {
        const addr = getWalletAddress();
        setAddress(addr);

        const chainId = await getChainId();
        setNetwork(chainId);

        const bal = await getBalance(addr);
        if (bal) setBalance(formatEther(bal));

        const tokenList = getNetworkTokens(chainId);
        const tokenBalList = await Promise.all(
            tokenList.map((token) =>
                getTokenBalance(token.address, addr).then((res) =>
                    formatUnits(res, token.decimals)
                )
            )
        );
        tokenList.forEach((token, i) => {
            tokenBalances[token.symbol] = tokenBalList[i];
        });
        setTokenBalances({ ...tokenBalances });
    };


    useEffect(() => {
        accountData();
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
    }, [network]);

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col border-2 rounded-lg border-blue-800 shadow-blue-500 shadow-sm justify-center mb-8 w-full mx-36'>
                <div className='flex flex-col items-center  w-full mb-4'>
                    <div className='bg-bluedark text-white px-4 py-2 m-4 rounded-md w-36 shadow-xl'>
                        <p className='text-2xl font-extrabold  text-center '>Wallet</p>
                    </div>
                    <div className='flex w-full'>
                        <div className='my-2 bg-blue-400 rounded-md py-2 px-10 mx-4 shadow-lg'>
                            <h1 className='text-white text-center '>{balance} {getNetworkCurr(network)}</h1>
                        </div>
                    </div>
                </div>
                <div>
                    {getNetworkTokens(network).map((token) => (
                        <div
                            key={token.symbol}
                            className="flex mb-8 mx-4 bg-white h-[72px] rounded-lg shadow items-center">
                            <div className='ml-4'>
                                <img
                                    onClick={() => addTokenToWallet(token)}
                                    src={token.imageUrl}
                                    className="w-12 h-12 mr-8 cursor-pointer"
                                />
                            </div>
                            <div>
                                <div>
                                    {token.name} ({token.symbol})
                                </div>
                                <div>
                                    {tokenBalances[token.symbol] || 0} {token.symbol}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default WalletForm