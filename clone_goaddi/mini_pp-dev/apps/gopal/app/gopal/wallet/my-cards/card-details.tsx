"use client";

import React, { SetStateAction, useState } from "react";
import { useLink } from "@/hooks/useLink";

import { useRouter } from "next/navigation";
import { DownloadIcon } from "../assets/svg/download-icon";
import Button from "../components/ft-button";
import { CopySimple, CreditCard } from "@phosphor-icons/react";
import { getInitials, handleCopyClick } from "@/utils";

const CardDetails = ({
  closeModal,
}: {
  closeModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { link, handleClick } = useLink("user");
  const [isSelected, setIsSelected] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(
    "/gopal/wallet?tab=wallet&wallet=share",
  );

  return (
    <div className="bg-white">
      <div className="relative">
        <div className="absolute flex items-center justify-center h-[80px] mt w-[78px] bg-[#E7F0FF]">
          {/* <CreditCard /> */}
          <CreditCard
            size={32}
            color="#0D6EFD"
            weight="bold"
            onClick={() => {
              handleCopyClick("card details");
            }}
          />
        </div>
        <img className="" src="/assets/modal-lines.svg" alt="modal-lines" />
      </div>

      <div>
        <p className="font-bold text-lg">Card Details</p>

        <div className="mt-5 text-xs space-y-3">
          <div className="flex flex-col gap-2">
            <p className="flex justify-between items-center">
              <span className="flex flex-col">
                <p className="text-gray-400 text-sm w-[250px]">Card Number</p>
                <p className="text-base font-semibold  text-[#1D2433]">
                  1234 5678 9090 0909
                </p>
              </span>
              <span>
                <CopySimple
                  size={20}
                  color="#0D6EFD"
                  weight="bold"
                  onClick={() => {
                    handleCopyClick("card details");
                  }}
                />
              </span>
            </p>

            <p className="flex justify-between items-center gap-2">
              <p className="flex justify-between items-center">
                <span className="flex flex-col">
                  <p className="text-gray-400 text-sm w-[250px]">Expiry</p>
                  <p className="text-base font-semibold  text-[#1D2433]">
                    09/2024
                  </p>
                </span>
                <span>
                  <CopySimple
                    size={20}
                    color="#0D6EFD"
                    weight="bold"
                    onClick={() => {
                      handleCopyClick("card details");
                    }}
                  />
                </span>
              </p>

              <p className="flex justify-between items-center">
                <span className="flex flex-col">
                  <p className="text-gray-400 text-sm w-[250px]">Cvv</p>
                  <p className="text-base font-semibold  text-[#1D2433]">788</p>
                </span>
                <span>
                  <CopySimple
                    size={20}
                    color="#0D6EFD"
                    weight="bold"
                    onClick={() => {
                      handleCopyClick("card details");
                    }}
                  />
                </span>
              </p>
            </p>

            <p className="flex justify-between items-center">
              <span className="flex flex-col">
                <p className="text-gray-400 text-sm w-[250px]">
                  Cardholder Name
                </p>
                <p className="text-base font-semibold  text-[#1D2433]">
                  Thomas Shelby
                </p>
              </span>
            </p>

            <p className="flex justify-between items-center">
              <span className="flex flex-col">
                <p className="text-gray-400 text-sm w-[250px]">
                  Billing Address
                </p>
                <p className="text-base font-semibold  text-[#1D2433]">
                  256 Chapman Road STE 105-4
                </p>
              </span>
              <span>
                <CopySimple
                  size={20}
                  color="#0D6EFD"
                  weight="bold"
                  onClick={() => {
                    handleCopyClick("card details");
                  }}
                />
              </span>
            </p>

            <p className="flex justify-between items-center">
              <span className="flex flex-col">
                <p className="text-gray-400 text-sm w-[250px]">State</p>
                <p className="text-base font-semibold  text-[#1D2433]">Lagos</p>
              </span>
            </p>

            <p className="flex justify-between items-center">
              <span className="flex flex-col">
                <p className="text-gray-400 text-sm w-[250px]">Zip Code</p>
                <p className="text-base font-semibold  text-[#1D2433]">
                  104231
                </p>
              </span>
            </p>
          </div>
        </div>

        <Button
          onClick={closeModal}
          text="Close Details"
          className="bg-[#F9FAFB] text-gray-400 border mt-3"
        />
      </div>
    </div>
  );
};

export default CardDetails;
