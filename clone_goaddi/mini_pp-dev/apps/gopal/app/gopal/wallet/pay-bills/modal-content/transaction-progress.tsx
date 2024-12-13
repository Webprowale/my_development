"use client";

import { useState } from "react";
import ModalLayout from "../../components/modal-layout";

import Spinner from "@/components/goui/spinner";
import WalletModal from "../../components/wallet-modal";
import { Phone } from "../../assets/svg/phone";

const TransactionProgress = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <ModalLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      closeModalRoute={"/gopal/wallet?tab=pay-bills"}
    >
      <WalletModal
        title="Transaction In Progress"
        text="Please wait"
        icon={<Phone />}
        children={
          <>
            <div className="flex flex-col items-center justify-center py-10 w-full">
              <div className="flex items-center justify-center bg-primary200 h-16 w-16 rounded-full">
                <Spinner />
              </div>
              <p className="font-bold mt-5">Paying for Airtime</p>
              <p className="text-sm text-gray-400">Do not close this modal</p>
            </div>
          </>
        }
      />
    </ModalLayout>
  );
};

export default TransactionProgress;
