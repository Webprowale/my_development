import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { PiCurrencyNgnBold } from "react-icons/pi";
const Card = ({ imageUrl, title, price }: {imageUrl:StaticImageData; title: string; price: string }) => (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
      <a href="#">
        <Image className="rounded-t-lg" src={imageUrl}  alt=''/>
      </a>
      <div className="px-3 py-3 border-b">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </div>
          <div className="flex items-center mx-3 gap-2 my-3">
            <h6 className='font-semibold font-serif'>From</h6>
            <h3 className='flex items-center text-[1.4rem] font-bold'><PiCurrencyNgnBold size={15} />{price}</h3>
          </div>
        <button className='bg-blue-600 hover:bg-blue-700 text-md font-serif w-full p-3 text-[1rem] text-white font-semibold'>View</button>
    </div>
  );
  

export default Card;