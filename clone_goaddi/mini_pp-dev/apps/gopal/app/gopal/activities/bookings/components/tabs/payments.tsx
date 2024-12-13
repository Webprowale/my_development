import { cn } from "@/lib/utils";
import React from "react";
import PaymentOptions from '../payments/payment-options'

type Props = {};

const SecurePayment = (props: Props) => {
  return (
    <div>
      <div className="my-5">
        <h2 className="font-semibold ">Secure Payment</h2>
        <p className="text-sm text-slate-500 max-w-sm">
          Enjoy a secure booking experience with our encrypted payment
          processing system.
        </p>
      </div>
      <div className="w-full mt-4 mb-5 p-4 border border-slate-200 rounded-sm">
        <h3 className="text-base font-semibold mb-3">Split Payment</h3>
        <div className="flex items-center gap-3">
          {SPLITSDATA.map((data, index) => {
            const { name, user, status } = data;
            return (
              <div key={index} className="flex gap-2 items-center">
                <img
                  src="/assets/trip-planner/avatar.png"
                  alt=""
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-[15px] text-black font-medium">{name}</p>
                    {user ? (
                      <div className="text-sm px-2 h-6 text-primary600 bg-primary100">
                        you
                      </div>
                    ) : null}
                  </div>
                  <div
                    className={cn(
                      "px-2 py-1 w-fit capitalize rounded-sm font-medium text-xs",
                      status === "pending" ? "bg-gray-200/70" : "bg-green-100",
                    )}
                  >
                    {status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full mt-4 mb-5 p-4 border border-slate-200 rounded-sm">
        <h3 className="text-base font-semibold mb-3">Payment options</h3>
        <div className="">
          <PaymentOptions />
        </div>
      </div>
    </div>
  );
};

export default SecurePayment;

const SPLITSDATA = [
  {
    name: "Olajide Zaccheaus",
    status: "pending",
    user: true,
  },
  {
    name: "Lawrenzo Matheo",
    status: "pending",
  },
  {
    name: "Adigun Fuad",
    status: "paid",
  },
];
