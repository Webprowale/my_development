import { useEffect, useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import ListUsers from './Listusers'
import CreateUser from './CreateUser'
import EditUsers from './EditUsers'
import React from 'react'
import axios from 'axios';


function App() {
const [inputChat, setInputChat] = useState('');
const [Loading, setLoading] = useState(true);
const [mychat, setChat] = useState('')



    const chatMe = async() =>{
      const encodedParams = new URLSearchParams()
      encodedParams.set('in', inputChat);
      encodedParams.set('op', 'in');
      encodedParams.set('cbot', '1');
      encodedParams.set('SessionID', 'RapidAPI1');
      encodedParams.set('cbid', '1');
      encodedParams.set('key', 'RHMN5hnQ4wTYZBGCF3dfxzypt68rVP');
      encodedParams.set('ChatSource', 'RapidAPI');
      encodedParams.set('duration', '1');
      
      const options = {
        method: 'POST',
        url: 'https://robomatic-ai.p.rapidapi.com/api',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': '8c8c1bc24cmshe17faec4ca7ad92p1f45ebjsn890a4f0df456',
          'X-RapidAPI-Host': 'robomatic-ai.p.rapidapi.com'
        },
        data: encodedParams,
      };
      
      try {
        const response = await axios.request(options);
      console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      finally{
        setLoading(false);
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        // Call your function here
        chatMe();
      }
    }
  
  if(Loading){
    <h5 className='text-4xl '>loading...</h5>
  }
  
  return (
    <div className="w-full">
      <h5 className='font-bold text-3xl text-green-600 text-center'>
        Home
      </h5>
      <nav className=' flex gap-3 justify-center bg-slate-400 p-5 rounded-2xl mb-16 mt-2 '>
      <li className='bg-green-400 rounded-xl text-center p-2 font-semibold w-24'> <Link to='/user/create'>Create </Link></li>
      <li className='bg-green-400 rounded-xl text-center p-2 font-semibold w-24'><Link to='/user/edit'>Edit</Link></li>
      </nav>
      <div className="flex justify-center flex-col">
       <div className="card">
        {mychat}
       </div>
      <input type="text" value={inputChat} onChange={(e)=>setInputChat(e.target.value)}  onKeyDown={handleKeyDown} className='w-80  p-3 rounded-lg  border-4 border-green-300'/>
</div>
      <Routes>
      
      <Route path='/user' element={<ListUsers />} />
      <Route path='/user/create' element={<CreateUser />} />
      <Route path='/user/edit' element={<EditUsers />} />
    </Routes>
    </div>
    
  )
}
export default App
