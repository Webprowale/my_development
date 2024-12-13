import React from 'react'
import dort from './assets/dort.png'
const Card = ({username, work= 'Debugging'}) => {
  return (
    <>
    <div className='md:flex bg-gray-400 px-3 py-4 text-slate-300 gap-x-6 items-center shadow-lg'>
        <img src={dort} alt=""  className='w-28 md:w-80 rounded-md'/>
        <div className="text-3xl text-blue-500">
        <h4 className='font-bold'>{username} </h4>
        <h6 className='text-sm'>{work} </h6>
        </div>
    </div>
</>
  )
}

export default Card