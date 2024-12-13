"use client";

import { Sim } from "../assets/svg/sim";
import { View } from "../assets/svg/view";
import { Settings } from "../assets/svg/settings";
import { MasterCard } from "../assets/svg/mastercard";
import { WalletButton } from "../components/wallet-button";
import CarouselComponent from "@/components/carousel/carousel";
import { useRouter, useSearchParams } from "next/navigation";
import ModalLayout from "../components/modal-layout";
import { useState } from "react";
import CardDetails from "./card-details";
import ManageCard from "./manage-card";

const MyCards = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("wallet");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-6">
      <button className="px-4 py-3 text-xs bg-[#E4E7EC] border-gray-200 rounded hidden md:block">
        Virtual Card
      </button>

      <div className=" flex flex-col justify-between mt-0 w-[380px] h-[225px] bg-[#1F2328] p-4 rounded  md:mt-6 ">
        <div className="flex items-center justify-between">
          <Sim />
          <MasterCard />
        </div>

        <div className="flex items-center justify-between text-white">
          <div className="font-bold text-xl">---- ---- ---- ----</div>
          <div className="">
            <p className="font-thin text-[10px]">CVV/CVC</p>
            <p>---</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-white">
          <div className="">
            <p className="text-[10px]">Cardholder name</p>
            <p>------------</p>
          </div>
          <div>
            <p className="text-[10px]">Expiry Date</p>
            <p>--/--</p>
          </div>
        </div>
      </div>

      <div className="mt-5 w-[380px]">
        <div className="flex items-center justify-between mt-3 space-x-4 w-full">
          <WalletButton
            icon={<View />}
            text="Show Details"
            onClick={() => {
              router.push("wallet?tab=my-cards&wallet=card-details");
              setIsOpen(true);
            }}
          />
          <WalletButton
            icon={<Settings />}
            text="Manage Card"
            onClick={() => {
              router.push("wallet?tab=my-cards&wallet=manage-card");
              setIsOpen(true);
            }}
          />
        </div>
      </div>

      <div className="mt-10 hidden md:block">
        <CarouselComponent
          data={[...new Array(1)]}
          baseNumber={"1"}
          content={<></>}
        />
      </div>

      {/* Method of Show Card Details  */}

      {currentTab === "card-details" && (
        <ModalLayout
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModalRoute={"/gopal/wallet?tab=my-cards"}
        >
          <CardDetails closeModal={() => setIsOpen(false)} />
        </ModalLayout>
      )}

      {/* Method of Manage Card */}

      {currentTab === "manage-card" && (
        <ModalLayout
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModalRoute={"/gopal/wallet?tab=wallet"}
        >
          <ManageCard closeModal={() => setIsOpen(false)} />
        </ModalLayout>
      )}
    </div>
  );
};

export default MyCards;
