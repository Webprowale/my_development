"use client";

import Image from "next/image";
import { Star } from "../assets/svg/star";
import { useEffect, useState } from "react";
import { DollarSign } from "../assets/svg/dollar-sign";
import { useRouter, useSearchParams } from "next/navigation";
import WalletBackground from "./../assets/go-points-background.png";
import ModalLayout from "../components/modal-layout";
import ConvertPoints from "./convert-point";
import TransactionSuccessful from "../transfer-funds/modal-content/transaction-successful";
import { usePointsStore } from "@/store/usePointsStore";
import PropagateLoader from "react-spinners/PropagateLoader";
import { formatNumber } from "@/lib/formatNumber";

const GoPoints = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("go-points");
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenConvert, setIsOpenConvert] = useState(false);

  const { response, loading, fetchPoints, error } = usePointsStore();

  useEffect(() => {
    fetchPoints();
  }, [fetchPoints]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader color="#0d6efd" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        An error occurred, please try again
      </div>
    );

  return (
    <div className="flex relative bg-secondary200 rounded">
      <div className="px-4 py-6 md:w-[375px] w-full">
        <div className="flex relative bg-[#F58A07] rounded">
          <div className="z-50 p-4">
            <Star color="white" />
            <div className="text-white pt-4">
              <p className="text-xs">GoPoints</p>
              <p className="text-3xl font-bold">
                {formatNumber(response?.data[0]?.points, 2)}
              </p>
            </div>
          </div>

          <Image
            src="/assets/EyeClosed.svg"
            alt="wallet-eyeIMage"
            className="absolute top-1 right-2 z-20"
            width={25}
            height={25}
          />

          <Image
            src={WalletBackground}
            alt="walletimage"
            className="absolute top-3 right-0 h-28"
          />
        </div>

        <button
          onClick={() => {
            router.push(`wallet?tab=go-points&go-points=convert-points`);
            setIsOpenConvert(true);
            setIsOpen(true);
          }}
          className="flex items-center justify-center space-x-3 border h-[38px] text-primary600 text-xs w-[180px] mt-6 py-1 font-bold rounded border-primary600"
        >
          <DollarSign />
          <p>Converts Points</p>
        </button>
      </div>

      {currentTab === "convert-points" && (
        <ModalLayout
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModalRoute={"/gopal/wallet?tab=go-points"}
        >
          <ConvertPoints
            isOpenConvert={isOpenConvert}
            setIsOpenConvert={setIsOpenConvert}
          />
        </ModalLayout>
      )}

      {/* {currentTab === "successful-transaction" && (
        <ModalLayout
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModalRoute={"/gopal/wallet?tab=go-points"}
        >
          <TransactionSuccessful
            title="Conversion Successful"
            text="Points have been added to your wallet balance"
            closeModal={() => setIsOpen(false)}
          />
        </ModalLayout>
      )} */}
    </div>
  );
};

export default GoPoints;
