import React from 'react'

const Card = () => {
  return (
    <div className=' w-96 shadow-lg border border-gray-100 rounded-sm p-10 text-center'>
        <div className='flex justify-center mb-8'>
        <img src='/Gatto_europeo4.jpeg' alt='cat' className=' rounded-full w-40 h-40 object-cover '></img>
        </div>
        <p className=' font-medium text-lg mb-4'>"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui sed facilis iste incidunt labore, et magnam doloribus optio iusto laboriosam repellendus officiis ex consequuntur minima eveniet beatae, quos nisi officia?"</p>
        <p className=' text-blue-400'>Apichaya Chuenjit</p>
        <p className=' text-blue-900'>Trainee @Finstable</p>
    </div>
  )
}

export default Card