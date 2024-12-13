"use client";

import { BackArrow } from "../assets/svg/back-arrow";
// import { TransactionCards } from "./transactions/transaction-card";
import { TRANSACTION_LINK_DATA } from "../constant/data";
import Tab from "../components/tab";
import { useWalletStore } from "@/store/useWalletStore";
import { TransactionCard } from "./transactions/transaction-card";
import { Wallet } from "@phosphor-icons/react";
import { PaginationDemo } from "../components/pagination";
import { useEffect } from "react";

const TransactionHistory = () => {
  const { transactionHistory, getAllWalletData } = useWalletStore();

  // Getting the transaction history
  useEffect(() => {
    getAllWalletData();
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="bg-white">
      <div className="px-5 pt-7 pb-4 rounded">
        <div
          onClick={handleGoBack}
          className="cursor-pointer"
        >
          <BackArrow />
        </div>
        <div className="mt-5">
          <p className="font-bold">Transaction History</p>
          <p className="text-gray-400 text-sm">
            Click on any transaction to see more details.
          </p>
        </div>
      </div>

      <Tab data={TRANSACTION_LINK_DATA} />

      <div className="flex flex-col gap-4 mt-8">
        {transactionHistory?.length > 0 ? (
          <>
            {transactionHistory.map((transact: any, index: number) => (
              <TransactionCard
                key={index}
                arrow="/assets/wallet/transaction-arrow-down.svg"
                timeTransect={transact?.created_at}
                amount={transact?.amount}
                transactionType={transact?.method}
                reference={transact?.reference}
                remarks={transact?.remarks}
              />
            ))}
            <div className="flex items-center justify-between px-2 py-1 bg-[#F7F9FC] text-xs">
              <p className="w-36">Page 1 of 30</p>
              <PaginationDemo />
              <p className="w-36">Go to page</p>{" "}
            </div>
          </>
        ) : (
          <div className="py-4 min-h-[200px] flex flex-col items-center justify-center">
            <Wallet
              size={70}
              className="text-[#94a3b8]"
            />
            <p className="text-[#94a3b8]">
              No transaction history yet! Please perform a transaction
            </p>
          </div>
        )}
      </div>

      {/* <div className="p-5">
        <TransactionCards />
      </div> */}
    </div>
  );
};

export default TransactionHistory;
