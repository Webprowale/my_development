"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../../components/ft-button";
import { AIRTIME_BUNDLE_DATA, AIRTIME_DATA } from "../../constant/data";
import NetworkLayout from "../components/network-layout";
import { SelectOption } from "../components/selectOption";
import ConfirmTransfer from "../modal-content/confirm-transfer";
import ModalLayout from "../../components/modal-layout";

const MobileAirtime = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const currentTab = searchParams.get("pay-bill");
  // const [isOpen, setIsOpen] = useState(true);

  // console.log(currentTab);

  return (
    <NetworkLayout title="Select Airtime Biller" data={AIRTIME_DATA}>
      <p className="font-bold">Buy Airtel Data</p>
      <div className="mt-5">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-black">Phone Number</label>
          <input
            placeholder="0909 090 0909"
            className="w-[616px] h-[40px] border rounded px-4"
          />
        </div>
        <div className="flex flex-col mt-5">
          <SelectOption data={AIRTIME_BUNDLE_DATA} />
        </div>

        {/* <Button
          onClick={() =>
            router.push("wallet?tab=pay-bills&pay-bill=confirm-transaction")
          }
          text="submit"
          className="w-[616px] text-white bg-primary600 text-xs mt-8"
        /> */}

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

export default MobileAirtime;
