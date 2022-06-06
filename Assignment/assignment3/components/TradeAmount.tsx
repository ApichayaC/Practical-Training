import React from 'react'

const TradeAmount = () => {
    return (
        <div>
            <div className='flex flex-col sm:flex-row justify-center'>
                <div className='m-6 sm:mr-20'>
                    <h3 className=' text-3xl font-bold'>Amount</h3>
                    <input
                        type="text"
                        placeholder="Amount"
                        className="p-2 rounded-md shadow w-64 my-4 sm:w-96 sm:p-3 sm:my-5" />
                    <br />
                    <button className='bg-green-500 text-white rounded-lg w-64 py-2 sm:w-96 sm:p-3'>Buy</button>
                </div>
                <div className='mx-8 mt-2 sm:my-8'>
                    <h3 className=' text-3xl font-bold'>Amount</h3>
                    <input
                        type="text"
                        placeholder="Amount"
                        className="p-2 rounded-md shadow w-64 my-4 sm:w-96 sm:p-3 sm:my-5" />
                    <br />
                    <button className='bg-red-600 text-white rounded-lg w-64 py-2 sm:w-96 sm:p-3'>Sell</button>
                </div>
            </div>
        </div>
    )
}

export default TradeAmount