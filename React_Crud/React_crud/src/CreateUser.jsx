import React, { useState } from 'react'
import axios from 'axios';
function CreateUser() {
    const [inputs, setInput] = useState({});
    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setInput(values=> ({...values, [name]:value}))
       
    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.post('http://localhost/API/users/read.php', inputs)
        .then(response=>{
            console.log('data send succefully', response.data)
        })
        .catch(error=>{
            console.log('Error sending data:', error)
        })
    }
    console.log(inputs);
  return (
    <div className="w-full flex justify-center">
        <div className="border-2 p-7 shadow-2xl bg-green-100">
        <form onSubmit={handleSubmit} >
       <label htmlFor="name">Name:</label>
       <input type="text" name='name' className='w-full outline-none   bg-white/2 rounded-full p-3' onChange={handleChange} />
       <br />
       <label htmlFor="email">Email:</label>
       <input type="email" name='email' className='w-full outline-none bg-white/2 rounded-full p-3' onChange={handleChange} />
       <br />
       <label htmlFor="mobile">Mobile Number:</label>
       <input type="tel" name='mobile'  className='w-full outline-none  bg-white/2 rounded-full p-3' onChange={handleChange} />
       <input type="submit" value="Send"  className='w-full outline-none  bg-green-400 rounded-full p-3 text-lg font-semibold text-center mt-4'/>
       </form>
       </div>
    </div>
  )
}

export default CreateUser