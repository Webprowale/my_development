import React from 'react'
import Card from './Card'

const Home = () => {
  return (
    <div>
         <h2 className='text-3xl bg-green-500 p-3'>Vite with Tailwind</h2>
          <Card  username='Fullstack Developer' />

    </div>
  )
}

export default Home