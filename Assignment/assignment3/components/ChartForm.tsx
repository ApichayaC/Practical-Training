import React from 'react'

const ChartForm = () => {
  return (
    <div className="rounded-xl shadow-lg w-full h-84 sm:w-full sm:max-w-4xl p-2 sm:p-12 bg-white z-20 relative ">
      <form>
        <h3 className="text-2xl font-bold text-center my-5 sm:mb-7 sm:text-3xl">Chart</h3>
        <div className="flex flex-col justify-center mb-2 sm:mb-5 sm:flex-row sm:space-x-16 sm:px-20">
          <div className="w-full">
            <p className=" text-sm sm:text-lg font-bold mb-2">Token 1</p>
            <input
              type="text"
              placeholder="Fill in token"
              className="p-4 sm:p-2 rounded-md shadow sm:w-72 w-full mb-2"
            />
          </div>
          <div>
            <p className=" text-sm sm:text-lg font-bold mb-2">Token 2</p>
            <input
              type="text"
              placeholder="Fill in token"
              className="p-4 sm:p-2 rounded-md shadow sm:w-72 w-full mb-2"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button className="rounded-md bg-darkbg text-white sm:px-12 sm:py-4 px-12 py-4 my-2 sm:mt-2">Fetch</button>
        </div>
      </form>
    </div>
  )
}

export default ChartForm