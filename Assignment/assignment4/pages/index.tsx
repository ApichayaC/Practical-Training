import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { getWalletAddress, connectWallet, getChainId } from "../services/wallet-service";
import { getNetworkName } from "../constants/network-id";

const Home: NextPage = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);

  const accountData = async() => {
    const addr = getWalletAddress() //user address
    // console.log(addr);
    setAddress(addr)

    const chainId =await getChainId();
    setNetwork(chainId)

  }

  useEffect(() => {
    accountData()
  })
  return (
    <div>
      {address ?
        (
          <div>
            <p>My wallet address is {address}</p>
            <p>Current network is {getNetworkName(network)} {network}</p>
          </div>
        )
        :
        (
          <button
            className="bg-blue-500 rounded-lg text-white px-8 py-4"
            onClick={connectWallet}
          >
            Connect
          </button>
        )
      }
    </div>
  )
}

export default Home;
