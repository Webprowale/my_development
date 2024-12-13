import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import BgGame from './bgGame'
import PassGame from './PassGame'
import Currency from './Currency'


function App() {


  return (
    <>
     

      <Routes location={location} key={location.pathname} >
      <Route path='/' element={<Home/>} />
      <Route path='/bg' element={<BgGame />} />
      <Route path='/pass' element={<PassGame />} />
      <Route path='/curr' element={<Currency />} />
      </Routes>
    </>
  )
}

export default App
