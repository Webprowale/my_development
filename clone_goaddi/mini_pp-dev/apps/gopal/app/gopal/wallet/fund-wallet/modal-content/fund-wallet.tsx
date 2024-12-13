"use client";

import React, { SetStateAction, useState } from "react";
import { useLink } from "@/hooks/useLink";
import { FUND_DATA } from "../../constant/data";
import Button from "../../components/ft-button";
import { DownloadIcon } from "../../assets/svg/download-icon";
import { useRouter } from "next/navigation";

const FundWallet = ({
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
          <DownloadIcon />
        </div>
        <img
          className=""
          src="/assets/modal-lines.svg"
          alt="modal-lines"
        />
      </div>

      <div>
        <p className="font-bold text-lg">Fund Wallet</p>
        <p className="text-gray-400 text-sm w-[250px]">
          How do you want to add funds to your wallet?
        </p>

        <div className="mt-5 text-xs space-y-3">
          {FUND_DATA.map((value, index) => (
            <RenderDetail
              key={index}
              icon={value.icon}
              link={value.link}
              title={value.title}
              text={value.text}
              selectedValue={link}
              onClick={handleClick}
              setIsSelected={setIsSelected}
              setSelectedPayment={setSelectedPayment}
            />
          ))}
        </div>

        <Button
          onClick={() => router.push(selectedPayment)}
          text="Next"
          className={`${isSelected ? "bg-primary600" : "bg-[#CFE2FF]"} text-white mt-5`}
        />

        <Button
          onClick={closeModal}
          text="Cancel"
          className="bg-[#F9FAFB] text-gray-400 border mt-2"
        />
      </div>
    </div>
  );
};

const RenderDetail = ({
  setSelectedPayment,
  setIsSelected,
  selectedValue,
  onClick,
  title,
  icon,
  link,
  text,
}: {
  setSelectedPayment: React.Dispatch<SetStateAction<string>>;
  setIsSelected: Function;
  selectedValue: string;
  onClick: (id: string) => void;
  icon: React.JSX.Element;
  title: string;
  text: string;
  link: string;
}) => {
  return (
    <div
      onClick={() => {
        onClick(title);
        setIsSelected(true);
        setSelectedPayment(link);
      }}
      className="flex items-center justify-between w-full p-3 hover:border-primary600 border cursor-pointer rounded"
    >
      <div className="flex items-start space-x-4">
        {icon}
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-xs">{text}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <input
          type="radio"
          value={selectedValue}
          checked={selectedValue === title}
          defaultChecked={false}
        />
      </div>
    </div>
  );
};

export default FundWallet;
