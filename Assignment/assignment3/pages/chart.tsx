import React from 'react'
import ChartForm from '../components/ChartForm'
import GetChart from '../components/GetChart'
import NavLayout from '../layouts/NavLayout'
import dynamic from "next/dynamic";
const ChartCreate = dynamic(() => import('../components/GetChart'), {
    ssr: false
});

const chart = () => {
    return (
        <NavLayout>
            <div className="bg-lightbg min-h-screen">
                <div className="flex justify-center w-full sm:px-14 px-4 relative mt-8">
                    <ChartForm />
                    <div className=" bg-darkbg h-full w-full absolute -top-28" />
                </div>
                <div className="flex justify-center w-full sm:px-14 px-4 mt-4">
                    <div className="rounded-xl shadow-lg w-full h-84 sm:w-full sm:max-w-4xl p-2 sm:p-12 bg-white z-20 relative ">
                        <div>
                            <div id='chart1'>
                                <ChartCreate />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NavLayout>
    )
}

export default chart