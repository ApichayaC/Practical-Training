import React from 'react'

const TradeOrder = () => {
    return (
        <div className="w-full sm:w-full sm:max-w-4xl mb-4">
            <h3 className="text-left text-2xl sm:text-3xl font-bold mb-4 py-2">Order History</h3>
            <div className="rounded-lg shadow-lg w-full text-center max-w-4xl bg-white z-20 relative sm:overflow-x-hidden overflow-x-auto">
                <table className="p-4  w-full">
                    <thead>
                        <tr className='border-2 border-b-gray-100 border-white rounded-t-lg '>
                            <th className="p-2 sm:p-4 text-sm sm:text-base">Order ID</th>
                            <th className="p-2 sm:p-4 text-sm sm:text-base">Date</th>
                            <th className="p-2 sm:p-4 text-sm sm:text-base">Symbol</th>
                            <th className="p-2 sm:p-4 text-sm sm:text-base">Type</th>
                            <th className="p-2 sm:p-4 text-sm sm:text-base">Price</th>
                            <th className="p-2 sm:p-4 text-sm sm:text-base">Input</th>
                            <th className="p-2 sm:p-4 text-sm sm:text-base">Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">#1</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">2/5/20022 10:30</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">BTC_USDT</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">Buy</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">40,000</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">10,000</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">0.3</td>
                        </tr>
                        <tr>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">#2</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">2/5/20022 10:30</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">BTC_USDT</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">Sell</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">40,000</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">10,000</td>
                            <td className="p-2 sm:p-4 text-sm sm:text-base">0.3</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TradeOrder