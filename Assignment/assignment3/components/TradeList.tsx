import React from 'react'
const arr: number[] = [1, 2, 3, 4, 5, 6, 7]

const TradeList = () => {
    return (
        <div>
            <div className='flex flex-col sm:flex-row justify-center mx-4'>
                <div className="sm:mr-20 ">
                    <h3 className="text-left text-3xl font-bold my-4 sm:my-4  sm:ml-56">Asks</h3>
                    <table className="w-full sm:w-96 text-left sm:ml-56 ">
                        <thead>
                            <tr>
                                <th >{"Price (USDT)"}</th>
                                <th>{"Amount (BTC)"}</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arr.map(() => (
                                    <tr>
                                        <td className=' text-red-500'>41403.12</td>
                                        <td>0.34</td>
                                        <td>10.67</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3 className="text-left text-3xl font-bold my-4 sm:my-4 ">Bids</h3>
                    <table className="w-full sm:w-96 text-left sm:mr-56">
                        <thead>
                            <tr>
                                <th>{"Price (USDT)"}</th>
                                <th>{"Amount (BTC)"}</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arr.map(() => (
                                    <tr>
                                        <td className=' text-green-500'>31403.12</td>
                                        <td>0.34</td>
                                        <td>10.67</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TradeList