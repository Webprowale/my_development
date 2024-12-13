import axios from 'axios';
import React, { useEffect, useState } from 'react'

function EditUsers() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(()=>{
     const getData = async () =>{
      try{
        const res = await axios.get('http://localhost/API/users/read.php');
        setUsers(res.data.data);
      }
      catch(error) {
        setError(error);
      }
      finally{
        setLoading(false);
      }
     }
     getData();
  },[users]);
  if(loading){
    return <h1 className='font-bold text-3xl text-center'>Loading...</h1>
  }
  if(error){
    return <p>Fail to Fetched</p>
  }
  return (
    <div className='flex justify-center'>
      {users.map(item=>(
        <li key={item.id}>
       <h5><strong>Name:</strong> {item.name}</h5> 
       <h5><strong>Email:</strong> {item.email}</h5> 
       <h5><strong>Mobile:</strong> {item.mobile}</h5> 
       <h5><strong>CreateAt:</strong> {item.create_at}</h5> 
       <h5><strong>UpdateAt:</strong> {item.update_at}</h5> 
        </li>
      )
      )}
      


    </div>
  )
}

export default EditUsers