import { useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import User from './Pages/User'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  

  return (
    <>
    
       <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/user' element={<User />} />
    </Routes>
    </>
  )
}

export default App

