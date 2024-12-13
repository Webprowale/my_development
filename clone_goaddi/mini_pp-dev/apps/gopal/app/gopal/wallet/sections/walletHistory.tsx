import Link from "next/link";
import { AllTransactionsIcon } from "../assets/svg/all-transactions";
import { TransactionCard } from "../transaction-history/transactions/transaction-card";
import { PaginationDemo } from "../components/pagination";
import { useWalletStore } from "@/store/useWalletStore";
import { Wallet, CaretCircleRight } from "@phosphor-icons/react";
import { useEffect } from "react";

const WalletHistory = () => {
  const { transactionHistory } = useWalletStore();

  return (
    <div className="mt-6">
      <div className="bg-white p-6 rounded">
        <div className="flex item-center justify-between">
          <p className="text-black font-semibold cursor-pointer">
            Transaction History
          </p>
          <Link href="/gopal/wallet/transaction-history">
            <div className="flex items-center justify-end space-x-3 cursor-pointer">
              <p className="hidden md:block">
                <span className="flex items-center gap-2">
                  <AllTransactionsIcon />
                  <p className="text-primary600 font-semibold">
                    All Transactions
                  </p>
                </span>
              </p>
              <p className="block md:hidden ">
                <span className="flex items-center gap-1">
                  <p className="text-primary600 font-semibold">See All</p>
                  <CaretCircleRight
                    color="#0D6EFD"
                    weight="bold"
                  />
                </span>
              </p>
            </div>
          </Link>
        </div>
        {/* <TransactionCards data={transactionHistory} /> */}
        {/* Transaction history */}
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
      </div>
    </div>
  );
};

export default WalletHistory;
