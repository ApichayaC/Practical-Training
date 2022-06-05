import React from "react";

const MarketList = () => {
    return (
        <div className="w-full sm:w-full sm:max-w-4xl ">
            <h3 className="text-left text-2xl sm:text-3xl font-bold mb-4 p-2">List</h3>
            {/* <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg text-center"> */}
            <div className="rounded-lg shadow-lg w-full  border-2 border-sky-200 text-center max-w-4xl bg-white z-20 relative sm:overflow-x-hidden overflow-x-auto">

                <table className="p-4  w-full">
                    <thead>
                        <tr className="border-2 border-gray-100">
                            <th className="p-2 sm:p-4 text-sm sm:text-base">Token1</th>
                            <th className="p-2 sm:p-4 text-sm sm:text-base">Token2</th>
                            <th className="p-2 sm:p-4 text-sm sm:text-base">Binance</th>
                            <th className="p-2 sm:p-4 text-sm sm:text-base">FTX</th>
                            <th className="p-2 sm:p-4 text-sm sm:text-base">Diff</th>
                            <th className="p-2 sm:p-4 text-sm sm:text-base">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">BTC</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">USDT</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">40,000</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">40,020</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">-0.049%</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">
                                <button className=" rounded-md bg-red-500 text-white w-20 h-8">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">ETH</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">USDT</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">30,000</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">2,999</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">-0.033%</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">
                                <button className=" rounded-md bg-red-500 text-white w-20 h-8">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MarketList;