import Link from "next/link";
import { AllTransactionsIcon } from "../assets/svg/all-transactions";
// import { TransactionCards } from "../transaction-history/transactions/transaction-card";
import { PaginationDemo } from "../components/pagination";
import { CaretCircleRight } from "@phosphor-icons/react";

const CardHistory = () => {
  const data: any = [];
  return (
    <div className="mt-12">
      <div className="bg-white p-4 rounded">
        <div className="flex item-center justify-between">
          <p className="text-black font-semibold cursor-pointer">
            Transaction History
          </p>
          <Link href="/gopal/wallet/transaction-history">
            <div className="flex items-center justify-end space-x-3 cursor-pointer">
              {/* <AllTransactionsIcon />
              <p className="text-primary600 font-semibold">All Transactions</p> */}
              <p className="hidden md:block">
                <AllTransactionsIcon />
                <p className="text-primary600 font-semibold">
                  All Transactions
                </p>
              </p>
              <p className="block md:hidden ">
                <span className="flex items-center gap-1">
                  <p className="text-primary600 font-semibold">See All</p>
                  <CaretCircleRight color="#0D6EFD" weight="bold" />
                </span>
              </p>
            </div>
          </Link>
        </div>
        {/* <TransactionCards data={data[0]} /> */}
      </div>
    </div>
  );
};

export default CardHistory;
