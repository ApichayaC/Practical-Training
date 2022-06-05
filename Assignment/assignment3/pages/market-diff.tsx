import React from 'react'
import MarketForm from '../components/MarketForm'
import MarketList from '../components/MarketList'
import NavLayout from '../layouts/NavLayout'

const marketDiff = () => {
    return (
        <NavLayout>
            <div className="bg-lightbg min-h-screen">
                <div className="flex justify-center w-full sm:px-14 px-4 relative mt-8">
                        <MarketForm />
                    <div className=" bg-darkbg h-full w-full absolute -top-28" />
                </div>
                <div className="flex justify-center w-full sm:px-14 px-4 mt-4">
                    <MarketList />
                </div>
            </div>
        </NavLayout>
    )
}

export default marketDiff