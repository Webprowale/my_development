import React, { useState } from "react";
import Comp from "./assets/comp.jpg";
import useCurrencyInfo from './Hooks/useCurrencyInfo'
import { InputBox } from "./Component/";
const Currency = () => {
    const [amount, setAmount] = useState(0)
    const [from, setFrom] = useState('usd')
    const [to, setTo] = useState('inr')
    const [ convertedAmount, setConvertedAmount] = useState(0)
    const currencyInfo = useCurrencyInfo(from)
    const options = Object.keys(currencyInfo)
    const convert = ()=>{
        setConvertedAmount(amount * currencyInfo[to])
    }
    const swap = ()=>{
        setFrom(to)
        setTo(from)
        setConvertedAmount(amount)
        setAmount(convertedAmount)

    }
  return (
    <main
      className="w-full h-screen flex items-center justify-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${Comp})` }}
    >
    <div className="w-full">
        <div className="w-full max-w-md
         mx-auto border border-gray-60 rounded-lg p-5
          backdrop-blur-sm bg-white/30">
          <form onSubmit={()=>{
            e.preventDefault()
            convert()
          }}>
            <div className="w-full mb-1">
             <InputBox 
             label="from"
             amount={amount}
             currencyOptions={options}
             onCurrencyChange={(currency)=>setFrom(currency)}
             onAmountChange={(amount)=>setAmount(amount)}
             selectedCurrency={from}
             />
            </div>
          </form>
        </div>
    </div>
    </main>
  );
};

export default Currency;
