export type Token = {
    name: string,
    symbol: string,
    decimals: number,
    imageUrl: string,
    address: string
}

export type ChainName ={
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