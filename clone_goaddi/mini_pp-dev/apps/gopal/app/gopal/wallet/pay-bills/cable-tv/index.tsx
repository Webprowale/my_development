"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/ft-button";
import { SelectOption } from "../components/selectOption";
import { CABLE_DATA, CABLE_TV_OPTION } from "../../constant/data";
import NetworkLayout from "../components/network-layout";

const CableTv = () => {
  const router = useRouter();
  const [isSelected, setIsSelected] = useState(false);
  console.log(isSelected);

  return (
    <NetworkLayout title="Select Cable & TV Biller" data={CABLE_DATA}>
      <p className="font-bold">Select Cable & TV Biller</p>
      <div className="mt-5">
        <div className="flex flex-col mt-5 space-y-2">
          <p className="text-sm">Select Package</p>
          <SelectOption data={CABLE_TV_OPTION} setIsSelected={setIsSelected} />
        </div>

        {!isSelected && (
          <div className="flex flex-col space-y-2 mt-5">
            <label className="text-sm text-black">Amount</label>
            <input
              type="number"
              placeholder=""
              className="w-[616px] h-[40px] border rounded px-4"
            />
          </div>
        )}


        <button
          onClick={() =>
            router.push("wallet?tab=pay-bills&pay-bill=confirm-transaction")
          }
          className="w-[616px] text-white bg-primary600 text-xs mt-8 rounded text-center font-bold py-2 text-semibold transaction cursor-pointer"
        >
          submit
        </button>
      </div>
    </NetworkLayout>
  );
};

export default CableTv;
