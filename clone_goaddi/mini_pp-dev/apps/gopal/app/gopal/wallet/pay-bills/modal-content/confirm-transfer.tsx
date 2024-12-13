"use client";

import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../../components/ft-button";
import airtel from "../../assets/svg/airtel.svg";
import WalletModal from "../../components/wallet-modal";
import { Phone } from "../../assets/svg/phone";
import { InputOTPControlled } from "../components/otp-from";
import ModalLayout from "../components/modal-layout";

const ConfirmTransfer = ({
  closeModal,
  closeModalRoute,
}: {
  closeModal: React.Dispatch<SetStateAction<boolean>>
  closeModalRoute: string;
}) => {
  const router = useRouter();


  return (
    <WalletModal
      title="Confirm Transaction"
      text="Please confirm the details of this transaction to proceed"
      icon={<Phone />}
      children={
        <>
          <div className="space-y-3 mt-5">
            <div className=" space-y-1">
              <p className="text-xs text-gray-600 font-thin">From</p>
              <p className="text-sm">Shally Pawpee</p>
            </div>

            <div className=" space-y-1">
              <p className="text-xs text-gray-600 font-thin">To</p>
              <p className="text-sm">0909 090 9090</p>
            </div>

            <div className=" space-y-1">
              <p className="text-xs text-gray-600 font-thin">Biller</p>
              <div className="flex flex-row items-center space-x-2">
                <Image src={airtel} alt="" className="h-[24px] w-[24px]" />
                <p className="text-sm font-semibold">Airtel</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className=" space-y-1 w-1/2">
                <p className="text-xs text-gray-600 font-thin">Amount</p>
                <p className="text-sm">NGN 1,000</p>
              </div>
              <div className=" space-y-1 w-1/2">
                <p className="text-xs text-gray-600 font-thin">
                  Transaction Fee
                </p>
                <p className="text-sm">NGN 1.00</p>
              </div>
            </div>

            <hr />

            <div className=" space-y-1 w-1/2">
              <p className="text-xs text-gray-600 font-thin">
                Total Transaction Amount
              </p>
              <p className="text-2xl font-bold">NGN 1,001.00</p>
            </div>

            <hr />

            <p className="text-xs text-center text-gray-700 font-thin">
              Please type in your transaction PIN
            </p>

            <div className="flex items-center justify-center w-full">
              <InputOTPControlled />
            </div>

            <Button
              onClick={() => router.push(closeModalRoute)}
              text="Confirm"
              className="bg-primary600 text-white mt-8"
            />
            <Button
              onClick={closeModal}
              text="Cancel"
              className="bg-white text-black border mt-2"
            />
          </div>
        </>
      }
    />
  );
};

export default ConfirmTransfer;
