import { useState } from 'react'


function App() {
  const name = "john";
  const y = 10;
  const x = 12;
  const names = ["brad", "good","solall"];
  const loggin = false;
   
  return (
    <>
    <div className="text-3xl font-bold underline bg-slate-500">App</div>
    <h1 className="text-3xl  underline">
      Hello world! {name}
    </h1>
    {names.map((name, index)=>(
      <li key={index}>{name}</li>
    ))}
    { loggin || <small>You are now loggedin</small>}
    </>
  )
}

export default App
