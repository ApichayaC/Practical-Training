import React from 'react'
import Topbar from '../components/Topbar'
import TradeAmount from '../components/TradeAmount'
import TradeForm from '../components/TradeForm'
import TradeList from '../components/TradeList'
import TradeOrder from '../components/TradeOrder'
import NavLayout from '../layouts/NavLayout'

const trade = () => {
    return (
        <NavLayout>
            <div className="bg-lightbg min-h-screen">
                <div className="flex justify-center w-full sm:px-14 px-4 relative mt-8">
                    <TradeForm />
                    <div className=" bg-darkbg h-full w-full absolute -top-28" />
                </div>
                <div className="flex justify-center w-full sm:px-14 px-4 mt-4">
                    <TradeList />
                </div>
                <div className='flex justify-center w-full'>
                    <TradeAmount/>
                </div>
                <div className="flex justify-center w-full sm:px-14 px-4 mt-4">
                    <TradeOrder/>
                </div>
            </div>
        </NavLayout>
    )
}

export default trade