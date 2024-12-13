import React, { useCallback, useEffect, useRef, useState } from 'react'

const PassGame = () => {
  const [passLeng, setLeng] = useState(10);
  const [numberAllow, setNumberAllow]= useState(false);
  const [charAllow, setCharAllow]= useState(false);
  const [ password, setPassword]= useState('');
  const [copy, setCopy] = useState('Copy')
const passRef = useRef(null);
  const generatorPassword = useCallback(()=>{
      let pass = ''
      let stir = 'ASDFGHJKLPOIUYTREWQZXCVBNMasdfghjklpoiuytrewqzxcvbnm'
     if(numberAllow) stir +='1234567890';
     if(charAllow) stir +='><?$%&^*()@!-+=';
     if(charAllow&numberAllow) stir +='1234567890><?$%&^*()@!-+='
     for(let i = 1; i < passLeng; i++){
        const char = Math.floor(Math.random()*stir.length +1);
         pass += stir.charAt(char)
      }
   setPassword(pass)

  },[passLeng, charAllow, numberAllow])

  useEffect(()=>{
    generatorPassword()
  }, [passLeng, charAllow, numberAllow])

  const copyPassword = ()=>{
   window.navigator.clipboard.writeText(password);
   setCopy("Copied");
   passRef.current?.select();
  }
  
  return (
    <div className='w-full max-md:w-80 overflow-hidden h-screen bg-gray-300 p-5  flex items-center justify-center'>
   <div className=" relative -top-[100px] p-8 bg-green-300 rounded-lg shadow-2xl ">
    <h2 className='relative text-center font-bold text-orange-500 text-3xl mb-8'>Password Generator</h2>
    <div className="flex justify-center gap-0 mb-6 ">
      <input type="text" readOnly placeholder='Passwowrd here' value={password} ref={passRef}  className='w-90 rounded-xl px-4 py-2 focus:outline-none ' />
      <button className='bg-orange-500 rounded-lg px-4 py-2 text-white text-2xl font-semibold -ms-4 ' onClick={copyPassword}>{copy}</button>
    </div>
    <div className="flex  flex-wrap items-center gap-5 justify-center">
      <div className="flex gap-1 w-30">
        <label htmlFor="range">{passLeng} </label>
      <input type="range" min={4} max={20} value={passLeng} onChange={(e)=>{setLeng(e.target.value)}} />
      </div>
      <div className="flex gap-1">
     <input type="checkbox"  defaultChecked={charAllow} onChange={()=> setCharAllow((prev)=>!prev)} className='text-2xl'  name='char'/> 
     <label htmlFor="char">Character</label>
     </div>
     <div className="flex gap-1">
     <input type="checkbox"  defaultChecked={numberAllow}
      onChange={()=>setNumberAllow((prev)=> !prev)
      }
       className='text-2xl'  name='numb'/> 
     <label htmlFor="numb">Number</label>
     </div>
    </div>
   </div>
    </div>
  )
}

export default PassGame