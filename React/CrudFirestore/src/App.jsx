import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddEditUser from './Pages/AddEditUser'
import Home from './Pages/Home'
function App() {


  return (
    <BrowserRouter>
    <div className="container-fluid">

    </div>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/add' element={<AddEditUser />} /> 
      <Route path='/update/:id' element={<AddEditUser />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
