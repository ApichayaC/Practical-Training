import { ETH_TOKENS, KOVAN_TOKENS, RINKEBY_TOKENS ,BITKUB_TOKENS } from "./tokens";

export const getNetworkName = (chainId: string | null) => {
  switch (chainId) {
    case "0x1":
      return "Ethereum mainnet";
    case "0x3":
      return "Ropsten Test Network";
    case "0x4":
      return "Rinkeby Test Network";
    case "0x2a":
      return "Kovan Test Network";
    case "0x56":
      return "Binance Smart Chain Mainnet";
    case "0x96":
      return "Bitkub Chain Testnet";
    default:
      return "Unknown network";
  }
};

export const getNetworkTokens = (chainId: string | null) => {
  switch (chainId) {
    case "0x1":
      return ETH_TOKENS;
    case "0x4":
      return RINKEBY_TOKENS;
    case "0x2a":
      return KOVAN_TOKENS;
    case "0x96":
      return BITKUB_TOKENS;
    // case "0x56":
    //   return "Binance Smart Chain Mainnet";
    //   case "0x60":
    //   return "Bitkub Chain";
    default:
      return ETH_TOKENS;
  }
};

export const getNetworkCurr = (chainId: string | null) => {
  switch (chainId) {
    case "0x56":
      return "BNB";
    case "0x61":
      return "BTC";
    case "0x38":
      return "USDT";
    case "0x96":
      return "KUB"
    default:
      return "ETH";
  }
}


export const getNetwork_Token = (
  chainId: string | null,
  tokenSymbol: string
) => {
  let tokenList = ETH_TOKENS;
  switch (chainId) {
    case "0x1":
      tokenList = ETH_TOKENS;
      break;
    case "0x4":
      tokenList = RINKEBY_TOKENS;
      break;
    case "0x2a":
      tokenList = KOVAN_TOKENS;
      break;

    default:
      tokenList = ETH_TOKENS;
      break;
  }
  return tokenList.find((token) => token.symbol === tokenSymbol);
}