"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import BettingAndLottory from "../assets/svg/betting.svg";
import Cable from "../assets/svg/cable.svg";
import Embassy from "../assets/svg/embassy.svg";
import Government from "../assets/svg/government.svg";
import Internet from "../assets/svg/internet.svg";
import Investment from "../assets/svg/investment.svg";
import Mobile from "../assets/svg/mobile.svg";
import Schools from "../assets/svg/schools.svg";
import Transportation from "../assets/svg/transportation.svg";
import Utility from "../assets/svg/utilities.svg";
import ModalLayout from "../components/modal-layout";
import ConfirmTransfer from "./modal-content/confirm-transfer";
import TransactionSuccessful from "../transfer-funds/modal-content/transaction-successful";

const PayBills = () => {
  const [isSelected, setIsSelected] = useState(false);
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("pay-bill");
  const [isOpen, setIsOpen] = useState(true);

  console.log(currentTab);

  const data = [
    { icon: BettingAndLottory, title: "Betting & Lottery", link: "#" },
    {
      icon: Cable,
      title: "Cable tv",
      link: "/gopal/wallet?tab=paybills&pay-bill=cable-tv",
    },
    { icon: Embassy, title: "Embassy", link: "#" },
    { icon: Government, title: "Governmnent", link: "#" },
    {
      icon: Internet,
      title: "Internet",
      link: "/gopal/wallet?tab=paybills&pay-bill=internet-subscription",
    },
    { icon: Investment, title: "Investment & Insurance", link: "#" },
    {
      icon: Mobile,
      title: "Mobile Recharge",
      link: "/gopal/wallet?tab=paybills&pay-bill=mobile-airtime",
    },
    { icon: Schools, title: "Schools", link: "#" },
    { icon: Transportation, title: "Transportation", link: "#" },
    { icon: Utility, title: "Utilities", link: "#" },
  ];

  return (
    <div className="space-y-4">
      <div className="h-max rounded bg-white">
        <div className="p-4">
          <div>
            <p className="text-xs font-bold mt-5">Choose Bill type</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5">
              {data.map((value, index) => (
                <Link
                  href={value.link}
                  key={index}
                  className="flex flex-col items-center justify-center rounded space-y-3 border py-4"
                >
                  <Image src={value.icon} alt="betting alt" />
                  <p className="text-[10px] text-center w-16">{value.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isSelected && <div className="mt-5 w-full h-56 bg-white"></div>}

      {currentTab === "confirm-transaction" && (
        <ModalLayout
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModalRoute={"/gopal/wallet?tab=pay-bills"}
        >
          <ConfirmTransfer
            closeModal={() => setIsOpen(false)}
            closeModalRoute="wallet?tab=pay-bills&pay-bill=transaction-successful"
          />
        </ModalLayout>
      )}

      {currentTab === "transaction-successful" && (
        <ModalLayout
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModalRoute={"/gopal/wallet?tab=pay-bills"}
        >
          <TransactionSuccessful
            title="Transaction Successful"
            text="Your transfer has been completed successfully"
            closeModal={() => setIsOpen(false)}
          />
        </ModalLayout>
      )}
    </div>
  );
};

export default PayBills;
