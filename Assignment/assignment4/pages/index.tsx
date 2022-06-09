import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { getWalletAddress, connectWallet, getEthereum } from "../services/wallet-service";
import Topbar from "../components/Topbar";
import WalletForm from "../components/WalletForm";
import Menu from "../components/Menu";

const Home: NextPage = () => {
  const [address, setAddress] = useState<string | null>(null);
  const accountData = async () => {
    const addr = getWalletAddress() //user address
    // console.log(addr);
    setAddress(addr)
  }
  useEffect(() => {
    accountData()
    //show realtime
    const handleAccountChange = (addresses: string[]) => {
      setAddress(addresses[0]);
      accountData();
    };
    getEthereum()?.on("accountsChanged", handleAccountChange);

  })
  return (
    <div className="bg-slate-100 h-screen">
      {address ?
        (
          <div>
            <Topbar />
            <Menu />
            <WalletForm />
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

export default Home;
