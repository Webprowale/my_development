import React, { useEffect, useState } from 'react'
import { auth } from '../firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Spinner from './Common/Spinner'
function HomeComponet() {
    const navigate = useNavigate();
    const [load, setLoad] = useState(true);
    useEffect(()=>{
        onAuthStateChanged(auth, (res)=>{
         if(!res?.accessToken){
           navigate("/")
         }
         else{
           setLoad(false);
         }
        })
    })
  return load ? <Spinner /> : <HomeComponet />;
}

export default HomeComponet