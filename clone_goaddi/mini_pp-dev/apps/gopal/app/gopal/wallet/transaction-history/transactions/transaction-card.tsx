import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Modal from "@/components/goui/modal";
import ArrowUp from "../../assets/ArrowUp.png";
import ArrowDown from "../../assets/ArrowDown.png";
import TransactionDetails from "./transaction-details";
import { PaginationDemo } from "../../components/pagination";
import { CurrencyNgn, Wallet } from "@phosphor-icons/react";
import { parseISO, format } from "date-fns";
import { addCommasToNumber } from "@/utils";

export const TransactionCard = ({
  arrow,
  timeTransect,
  amount,
  transactionType,
  reference,
  remarks,
}: {
  arrow: string;
  timeTransect: string;
  amount: number;
  transactionType: string;
  reference?: string;
  remarks?: string;
}) => {
  const [transaction, setTransaction] = useState(false);

  const checkType = (type: string) => {
    if (type === "credit") {
      return "Money Received";
    }
    if (type === "debit") {
      return "Money Transferred";
    }
  };

  const IconType = (type: string) => {
    if (type === "credit") {
      return "/assets/wallet/transaction-arrow-down.svg";
    }
    if (type === "debit") {
      return "/assets/wallet/transaction-arrow-up.svg";
    }
  };

  return (
    <>
      <div
        className="flex items-start p-2 border rounded space-x-2 cursor-pointer"
        onClick={() => setTransaction(true)}
      >
        <Image
          src={IconType(transactionType)}
          width={56}
          height={56}
          className=""
          quality={90}
          alt=""
        />
        <div className="flex items-start justify-between w-full">
          <div className="">
            <p className="font-semibold text-sm">
              {checkType(transactionType)}
            </p>
            <p className="text-xs pt-3 text-gray-400">
              {format(parseISO(timeTransect), "h:mma")}
            </p>
          </div>

          <div>
            <p className="text-black font-semibold flex items-center gap-[2px]">
              <CurrencyNgn size={18} />
              {addCommasToNumber(amount)}
            </p>
          </div>
        </div>
      </div>

      <Modal
        className="w-[600px] max-h-[640px] bg-white flex flex-col gap-2"
        isOpen={transaction}
        onClose={() => setTransaction(false)}
        trigger={<p></p>}
      >
        <TransactionDetails
          amount={amount}
          time={timeTransect}
          type={transactionType}
          remarks={remarks}
          reference={reference}
        />
      </Modal>
    </>
  );
};

// export const TransactionCards = ({ data }: any) => {
//   return (
//     <div className="mt-4">
//       {/* <p className="text-gray-400 text-sm">
//         {new Date(Date.now()).toDateString()}
//       </p> */}
//       {data?.length === 0 ? (

//       ) : (
//         data?.map((content: any, index: any) => {
//           return (
//             <div
//               key={index}
//               className="space-y-2 mt-3"
//             >
//               <TransactionCard
//                 transactionType={content.transactionType}
//                 amount={content.pointsAdded}
//                 timeTransect={new Date(content.updatedat).toUTCString()}
//                 arrow={
//                   content.transactionType === "subscription"
//                     ? ArrowDown
//                     : ArrowUp
//                 }
//               />
//             </div>
//           );
//         })
//       )}

//       {!data || data[0] === undefined ? null : (
//         <div className="flex items-center justify-between px-2 py-1 bg-[#F7F9FC] text-xs">
//           <p className="w-36">Page 1 of 30</p>
//           <PaginationDemo />
//           <p className="w-36">Go to page</p>
//         </div>
//       )}
//     </div>
//   );
// };
