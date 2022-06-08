import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const getEthereum = () => {
  if (typeof window.ethereum !== 'undefined') {
    return window.ethereum;
  }
  return null;
}

export const getProvider = () => {
  const ethereum = getEthereum()
  if (ethereum) {
    return new ethers.providers.Web3Provider(getEthereum()); // what MetaMask injects as window.ethereum into each page
  }
  return null
}

//connect user account in metamask
export const connectWallet = () => {
  return getEthereum()?.request({
    method: "eth_requestAccounts",
  }) as Promise<string>;
}

export const getWalletAddress = () => {
  return getEthereum()?.selectedAddress as string;
}

//handle chain network
export const getChainId = () => {
  return getEthereum()?.request({
    method: "eth_chainId"
  }) as Promise<string>;
}

//balance
export const getBalance = (address:string)=> {
  const provider = getProvider()
  return provider?.getBalance(address);
}