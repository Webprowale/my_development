import React from "react";
import { GoAuthButton } from "@/components/goui/button";
import { Question, Wallet } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { naira } from "@/utils/money";

type Props = {};

const WalletPayment = (props: Props) => {
  return (
    <div className="">
      <div className="max-w-2xl flex items-center gap-x-4">
        <div className="bg-primary600 z-10 rounded-sm overflow-hidden relative p-4 max-w-[300px] w-full">
          <div className="justify-end absolute ">
            <img
              src="/assets/payment-options/cardPath.svg"
              className="h-full w-[400px] object-cover"
              style={{ zIndex: 1 }}
              alt=""
            />
          </div>

          <div style={{ zIndex: 999999 }} className="">
            <Wallet size={25} className="text-white" />

            <div className="text-[14px] py-2 text-white">Wallet Balance</div>

            <div
              style={{ zIndex: 999999 }}
              className="text-2xl z-[10] font-semibold text-white"
            >
              NGN 50,000,000.00
            </div>
          </div>
        </div>
        <div className="rounded-sm max-w-[380px] w-full bg-warning100 text-warning900 p-3">
          <div className="flex justify-between items-center font-semibold">
            <div className="flex gap-2 items-center  text-warning900">
              <Question size={16} weight="fill" className="text-warning900" />
              <div className="text-sm">Oops!</div>
            </div>
          </div>
          <p className="text-sm py-1 my-2">
            Your current balance{" "}
            <span className="font-semibold text-warning900">
              NGN 123,563.00
            </span>{" "}
            won't cover this trip{" "}
            <span className="text-warning900 font-semibold">
              NGN 234,245.00
            </span>
            Top up your wallet to proceed.
          </p>
          <button className="text-xs mt-2 py-1.5 px-7 rounded-sm text-white bg-warning900">
            Top Up
          </button>
        </div>
      </div>
      <hr className="bg-gray-100 h-[1px] w-full my-5" />
      <div className="flex flex-col gap-2 mt-6">
        <div className="flex flex-col items-center gap-1">
          <div className="text-sm text-black">Total Price</div>
          <div className="text-black font-semibold text-xl">
            {naira("234245")}
          </div>
        </div>
        <div className="">
          <GoAuthButton
            type="submit"
            // loading={loading}
            className="w-full py-2 md:text-sm mt-4"
          >
            Complete Booking
          </GoAuthButton>
        </div>
      </div>
    </div>
  );
};

export default WalletPayment;
