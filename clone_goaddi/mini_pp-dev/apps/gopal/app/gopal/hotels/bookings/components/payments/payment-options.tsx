import React, { useState } from "react";
import { GoAuthButton } from "@/components/goui/button";

import { cn } from "@/lib/utils";
import { naira } from "@/utils/money";
import { Question, Wallet } from "@phosphor-icons/react";
import WalletPayment from "./wallet";
import CardPayment from "./card";
import AlatPayment from "./alat";

type Props = {};
const PaymentOptions = (props: Props) => {
  const [activeTab, setActiveTab] = useState("wallet");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  console.log(activeTab);

  return (
    <div className="flex flex-col">
      <div className="flex space-x-4 mb-4">
        <input
          type="radio"
          id="wallet"
          name="tabs"
          className="hidden"
          checked={activeTab === "wallet"}
          onChange={() => handleTabChange("wallet")}
        />
        <label
          htmlFor="wallet"
          className={cn(
            "inline-flex justify-center items-center gap-3 px-3 h-9 bg-gray-50 rounded-sm border font-medium text-[13px]",
            activeTab === "wallet"
              ? "border-primary600  border-2"
              : "border-gray-200",
          )}
        >
          <img
            src="/assets/payment-options/wallet.svg"
            className="h-4 w-fit"
            alt=""
          />
          Wallet
          <span
            className={cn(
              "w-4 h-4 inline-flex justify-center items-center border rounded-full ",
              activeTab === "wallet"
                ? "bg-primary600 border-none"
                : "border-gray-700",
            )}
          >
            {activeTab === "wallet" ? (
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            ) : null}
          </span>
        </label>

        {/* <input
          type="radio"
          id="card"
          name="tabs"
          className="hidden"
          checked={activeTab === "card"}
          onChange={() => handleTabChange("card")}
        />
        <label
          htmlFor="card"
          className={cn(
            "inline-flex justify-center items-center gap-3 px-3 h-9 bg-gray-50 rounded-sm border font-medium text-[13px]",
            activeTab === "card"
              ? "border-primary600  border-2"
              : "border-gray-200",
          )}
        >
          <img
            src="/assets/payment-options/master-card.svg"
            className="h-4 w-fit"
            alt=""
          />
          Credit/Debit Card
          <span
            className={cn(
              "w-4 h-4 inline-flex justify-center items-center border rounded-full ",
              activeTab === "card"
                ? "bg-primary600 border-none"
                : "border-gray-700",
            )}
          >
            {activeTab === "card" ? (
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            ) : null}
          </span>
        </label> */}
        <input
          type="radio"
          id="alat"
          name="tabs"
          className="hidden"
          checked={activeTab === "alat"}
          onChange={() => handleTabChange("alat")}
        />
        <label
          htmlFor="alat"
          className={cn(
            "inline-flex justify-center items-center gap-3 px-3 h-9 bg-gray-50 rounded-sm border font-medium text-[13px]",
            activeTab === "alat"
              ? "border-primary600  border-2"
              : "border-gray-200",
          )}
        >
          <img
            src="/assets/payment-options/alat.svg"
            className="h-4 w-fit"
            alt=""
          />
          Alat
          <span
            className={cn(
              "w-4 h-4 inline-flex justify-center items-center border rounded-full ",
              activeTab === "alat"
                ? "bg-primary600 border-none"
                : "border-gray-700",
            )}
          >
            {activeTab === "alat" ? (
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            ) : null}
          </span>
        </label>
      </div>

      <hr className="bg-gray-100 h-[1px] w-full my-5" />

      {activeTab === "wallet" ? <WalletPayment /> : null}
      {/* {activeTab === "card" ? <CardPayment /> : null} */}
      {activeTab === "alat" ? <AlatPayment /> : null}
    </div>
  );
};

export default PaymentOptions;
