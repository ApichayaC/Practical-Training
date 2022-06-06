import { ethers } from "ethers";

declare global {
    interface Window {
        ethereum: ethers.providers.ExternalProvider & ethers.providers.JsonRpcFetchFunc
    }
}
export const connectWallet = ()=> {
if (typeof window.ethereum !== 'undefined' && window.ethereum.request) {
    return window.ethereum.request({ method: 'eth_requestAccounts' });
}}
export const getWallet = ()=>{
    if(typeof window.ethereum !== 'undefined' && window.ethereum){
        const walletAddr = (window.ethereum as any).selectedAddress 
        return walletAddr as string;
    }
    return null;
}