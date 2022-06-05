import React from 'react'
import ChartForm from '../components/ChartForm'
import NavLayout from '../layouts/NavLayout'


const chart = () => {
    return (
        <div>
            <NavLayout>
            <div className="bg-lightbg min-h-screen">
                <div className="flex justify-center w-full px-14 relative mb-14 mt-8">
                    <ChartForm/>
                    <div className="bg-darkbg h-full w-full absolute -top-20" />
                </div>
                <div>
                </div>
            </div>
        </NavLayout>
        </div>
    )
}

export default chart