"use client";
import { useLink } from "@/hooks/useLink";
import Button from "../../components/ft-button";
import NetworkLayout from "../components/network-layout";
import Link from "next/link";
import { AIRTIME_DATA } from "../../constant/data";
import { useRouter } from "next/navigation";

const InternetSubscription = () => {
  const router = useRouter();
  const { link, handleClick } = useLink("");
  const amount_data = ["₦1,000", "₦2,000", "₦5,000", "₦10,000"];
  return (
    <NetworkLayout title="Select Data Biller" data={AIRTIME_DATA}>
      <p className="font-bold">Buy Airtel Data</p>
      <div className="mt-5 space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-black">Phone Number</label>
          <input
            placeholder="0909 090 0909"
            className="w-[616px] h-[40px] border rounded px-4"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm text-black">Choose an Amount</label>
          <div className="flex items-center space-x-3">
            {amount_data.map((value, index) => (
              <div
                key={index}
                onClick={() => handleClick(value)}
                className="flex items-center justify-between cursor-pointer h-[40px] border w-[145px] rounded px-4"
              >
                <p className="text-sm text-black font-bold">{value}</p>
                <input
                  type="radio"
                  className="h-5 w-5"
                  checked={value === link}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm text-black">Or Enter an Amount</label>
          <input
            placeholder="How much airtime"
            className="w-[616px] h-[40px] border rounded px-4"
          />
        </div>

        <button
          onClick={() =>
            router.push("wallet?tab=pay-bills&pay-bill=confirm-transaction")
          }
          className="w-[616px] text-white bg-primary600 text-xs mt-8 rounded text-center font-bold py-2 text-semibold transaction cursor-pointer"
        >
          Continue
        </button>
      </div>
    </NetworkLayout>
  );
};

export default InternetSubscription;
