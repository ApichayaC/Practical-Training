import React from 'react'
import ChartForm from '../components/ChartForm'
import GetChart from '../components/GetChart'
import NavLayout from '../layouts/NavLayout'


const chart = () => {
    return (
        <NavLayout>
            <div className="bg-lightbg min-h-screen">
                <div className="flex justify-center w-full sm:px-14 px-4 relative mt-8">
                    <ChartForm />
                    <div className=" bg-darkbg h-full w-full absolute -top-28" />
                </div>
                <div  className="flex justify-center w-full sm:px-14 px-4 mt-4">
                    {/* <GetChart/>s */}
                </div>
            </div>
        </NavLayout>
    )
}

export default chart