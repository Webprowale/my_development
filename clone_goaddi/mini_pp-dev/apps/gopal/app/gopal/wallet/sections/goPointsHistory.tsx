import Link from "next/link";
import { AllTransactionsIcon } from "../assets/svg/all-transactions";
// import { TransactionCards } from "../transaction-history/transactions/transaction-card";
import { PaginationDemo } from "../components/pagination";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useEffect } from "react";
import { usePointsHistoryStore } from "@/store/usePointsStore";
import { CaretCircleRight } from "@phosphor-icons/react";

const GoPointsHistory = () => {
  const { loading, fetchPointsHistory, success, data, message } =
    usePointsHistoryStore();

  useEffect(() => {
    fetchPointsHistory();
  }, [fetchPointsHistory]);

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader color="#0d6efd" />
      </div>
    );

  // SAMPLE
  const sampleData = [
    {
      history: [
        {
          transactionId: "42",
          transactionType: "subscription",
          transactionPrice: "20000.00",
          pointsAdded: "20.00",
          previousPoint: "12012270.00",
          currentPoint: "12012290.00",
          createdAt: "2024-05-20 15:03:59",
          updatedat: "2024-05-20 15:03:59",
        },
        {
          transactionId: "41",
          transactionType: "withdrawal",
          transactionPrice: "30000.00",
          pointsAdded: "30.00",
          previousPoint: "12012240.00",
          currentPoint: "12012270.00",
          createdAt: "2024-05-20 15:03:27",
          updatedat: "2024-05-20 15:03:27",
        },
        {
          transactionId: "40",
          transactionType: "subscription",
          transactionPrice: "1000000000.00",
          pointsAdded: "12000000.00",
          previousPoint: "12240.00",
          currentPoint: "12012240.00",
          createdAt: "2024-05-20 15:02:58",
          updatedat: "2024-05-20 15:02:58",
        },
        {
          transactionId: "39",
          transactionType: "subscription",
          transactionPrice: "12000000.00",
          pointsAdded: "12000.00",
          previousPoint: "240.00",
          currentPoint: "12240.00",
          createdAt: "2024-05-20 15:02:49",
          updatedat: "2024-05-20 15:02:49",
        },
        {
          transactionId: "38",
          transactionType: "subscription",
          transactionPrice: "120000.00",
          pointsAdded: "120.00",
          previousPoint: "120.00",
          currentPoint: "240.00",
          createdAt: "2024-05-20 15:02:40",
          updatedat: "2024-05-20 15:02:40",
        },
        {
          transactionId: "37",
          transactionType: "subscription",
          transactionPrice: "60000.00",
          pointsAdded: "60.00",
          previousPoint: "60.00",
          currentPoint: "120.00",
          createdAt: "2024-05-20 15:02:29",
          updatedat: "2024-05-20 15:02:29",
        },
        {
          transactionId: "36",
          transactionType: "subscription",
          transactionPrice: "30000.00",
          pointsAdded: "30.00",
          previousPoint: "30.00",
          currentPoint: "60.00",
          createdAt: "2024-05-20 15:02:17",
          updatedat: "2024-05-20 15:02:17",
        },
        {
          transactionId: "35",
          transactionType: "withdrawal",
          transactionPrice: "30000.00",
          pointsAdded: "30.00",
          previousPoint: "0.00",
          currentPoint: "30.00",
          createdAt: "2024-05-20 15:02:09",
          updatedat: "2024-05-20 15:02:09",
        },
      ],
    },
  ];

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
        {/* <TransactionCards data={sampleData[0].history} /> */}
      </div>
    </div>
  );
};

export default GoPointsHistory;
