//@ts-nocheck
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ModalLayout from "../components/modal-layout";
import Button from "../components/ft-button";
import WalletModal from "../components/wallet-modal";
import { Star } from "../assets/svg/star";
import { useRouter, useSearchParams } from "next/navigation";
import TransactionSuccessful from "../transfer-funds/modal-content/transaction-successful";
import { usePointsStore } from "@/store/usePointsStore";
import { formatNumber } from "@/lib/formatNumber";
// import ConfirmTransfer from "./successful-transaction";
type Props = {
  isOpenConvert: boolean;
  setIsOpenConvert: React.Dispatch<React.SetStateAction<boolean>>;
};
const ConvertPoints = ({ isOpenConvert, setIsOpenConvert }: Props) => {
  const [disable, setDisable] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [amount, setAmount] = useState<Number>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("go-points");
  const [step, setStep] = useState(0);

  const { response, loading, fetchPoints } = usePointsStore();

  // useEffect(() => {
  //   if (response?.data[0]?.points < 1) {
  //     setDisable(true);
  //   }
  // }, []);

  console.log(
    typeof response?.data[0]?.points,
    typeof Number(formatNumber(amount, 2)),
    navigator.language,
  );

  return (
    <WalletModal
      icon={<Star color="#0D6EFD" />}
      title="Convert Points"
      text="How much points do you want to add to your wallet?"
      children={
        <>
          {step === 0 && (
            <div className="">
              <div className="mt-5">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm">Points to add</label>
                  <input
                    onChange={(e) => {
                      setAmount(+e.target.value);
                      if (
                        Number(formatNumber(amount, 2)) >
                        response?.data[0]?.points
                      ) {
                        setDisableSubmit(true);
                      }
                    }}
                    className="rounded border h-[56px] text-sm p-3"
                    placeholder="Enter an amount"
                    type="number"
                    disabled={disable}
                  />
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-gray-400">
                      Available Points:{" "}
                      {formatNumber(response?.data[0]?.points, 2)}
                    </label>
                    <p className="text-xs text-red-400 font-medium">
                      {amount < 1
                        ? "You don't have enough points to convert"
                        : amount > response?.data[0]?.points
                          ? "Value greater than your available points"
                          : ""}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3 p-3 rounded border">
                  <div className="flex items-center justify-between">
                    <p className="text-xs">Points to add</p>
                    <p
                      className={`text-sm ${amount ? "text-black font-semibold" : "text-gray-400"}`}
                    >
                      {amount ? (
                        formatNumber(amount, 2)
                      ) : response?.data[0]?.points < 1 ? (
                        <div className="font-bold">Please refer someone</div>
                      ) : (
                        "Please enter points"
                      )}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xs">Conversion Factor</p>
                    <p className="font-semibold">
                      {amount ? "0.20" : "NGN 0.00"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">
                      Amount added to wallet
                    </p>
                    <p className="font-bold text-xl">
                      {amount || amount < 1
                        ? formatNumber(amount * 0.2, 2).toLocaleString(
                            navigator.language,
                            {
                              style: "currency",
                              currency: "NGN",
                            },
                          )
                        : "NGN 0.00"}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                disabled={disableSubmit}
                onClick={() => {
                  setStep(1);
                  router.replace(
                    "/gopal/wallet?tab=go-points&go-points=successful-transaction",
                  );
                }}
                text="Convert Points"
                className={`text-white  mt-5 disabled:cursor-not-allowed ${amount ? "bg-primary600" : "bg-[#CFE2FF]"}`}
              />
              <Button
                onClick={() => setIsOpenConvert(false)}
                text="Cancel"
                className="bg-white text-black border mt-2"
              />
            </div>
          )}

          {step === 1 && (
            <div>
              {" "}
              <TransactionSuccessful
                title="Conversion Successful"
                text="Points have been added to your wallet balance"
                closeModal={() => setIsOpenConvert(false)}
              />
            </div>
          )}
        </>
      }
    />
  );
};

export default ConvertPoints;
//  {
//    currentTab === "share" && (
//      <ModalLayout
//        isOpen={isOpen}
//        setIsOpen={setIsOpen}
//        closeModalRoute={"wallet?table=go-points"}
//      >
//        <TransactionSuccessful
//          title="Conversion Successful"
//          text="Points have been added to your wallet balance"
//          closeModal={() => setIsOpen(false)}
//        />
//      </ModalLayout>
//    );
//  }
