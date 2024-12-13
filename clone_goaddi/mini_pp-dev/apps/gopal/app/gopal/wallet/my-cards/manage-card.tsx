"use client";

import React, { SetStateAction, useState } from "react";
import { useLink } from "@/hooks/useLink";

import { useRouter } from "next/navigation";
import { DownloadIcon } from "../assets/svg/download-icon";
import { Button as CardButton } from "@/components/ui/button";
import Button from "../components/ft-button";
import { CreditCard } from "@phosphor-icons/react";

const ManageCard = ({
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
          <CreditCard size={32} color="#0D6EFD" weight="bold" />
        </div>
        <img className="" src="/assets/modal-lines.svg" alt="modal-lines" />
      </div>

      <div>
        <p className="font-bold text-lg">Manage Card</p>
        <p className="text-gray-400 text-sm w-[250px]">
          Manage your Virtual Card
        </p>

        <div className="flex items-center justify-between gap-1">
          <CardButton className={`bg-[#E4E7EC]  text-[#D42620] mt-5 w-full`}>
            Block Card
          </CardButton>

          <CardButton className={`bg-[#E4E7EC]  text-black mt-5 w-full`}>
            Freeze Card
          </CardButton>
        </div>
        <Button
          onClick={() => router.push("/gopal/wallet?tab=wallet")}
          text="Back to Wallet"
          className="bg-[#F9FAFB] text-gray-400 border mt-2"
        />
      </div>
    </div>
  );
};

export default ManageCard;
