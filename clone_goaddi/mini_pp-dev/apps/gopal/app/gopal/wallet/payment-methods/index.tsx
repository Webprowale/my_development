"use client";

import Image from "next/image";
import { useState } from "react";
import nosavedcard from "../assets/svg/no-saved-card-icon.svg";
import CardImg from "./../assets/svg/mastercard_icon.jpeg.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PaymentMethod = () => {
  const router = useRouter();
  return (
    <div className="p-4">
      <p className="font-bold">Payment Method</p>

      <div className="border p-4 mt-4">
        {/* No Card Selected */}
        {/* <>
            <Image src={nosavedcard} alt="payment alt" />

            <p className="mt-10 font-thin">No Saved Card</p>
            <p className="font-thin text-xs text-gray-600">
              Add a new payment method to see your cards here
            </p>

            <button className="font-thin bg-primary600 text-sm px-5 py-2 rounded mt-5 text-white">
              Add New Card
            </button>
          </> */}

        <div className="flex flex-col items-start justify-start space-y-3">
          <div className="flex items-center justify-between bg-[#F9FAFB] rounded h-[87px] border px-4 w-[500px]">
            <div className="flex items-center space-x-3">
              <Image src={CardImg} alt="cardimg alt" />
              <div className="">
                <p>123 **** **** **86</p>
                <p className="text-xs text-gray-400">Expires 06/2024</p>
              </div>
            </div>
            <button className="font-thin bg-red-200  text-sm px-5 py-2 rounded mt-5 text-red-600">
              Remove
            </button>
          </div>

          <div className="flex items-center justify-between bg-[#F9FAFB] rounded h-[87px] border px-4 w-[500px]">
            <div className="flex items-center space-x-3">
              <Image src={CardImg} alt="cardimg alt" />
              <div className="">
                <p>123 **** **** **86</p>
                <p className="text-xs text-gray-400">Expires 06/2024</p>
              </div>
            </div>
            <button className="font-thin bg-red-200  text-sm px-5 py-2 rounded mt-5 text-red-600">
              Remove
            </button>
          </div>

          <button
          onClick={() => router.push("wallet?tab=add-new-card")}
          className="font-thin bg-primary600 text-sm px-5 py-2 rounded mt-5 text-white">
            Add New Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
