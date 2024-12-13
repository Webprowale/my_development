"use client";

import Link from "next/link";
import { LINK_DATA } from "../constant/data";
import { AllTransactionsIcon } from "../assets/svg/all-transactions";
import { PaginationDemo } from "../components/pagination";
import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import WalletHome from "../fund-wallet";
import MyCards from "../my-cards";
import Tab from "../components/tab";
import GoPoints from "../go-points/go-points";
import PayBills from "../pay-bills";
import MobileAirtime from "../pay-bills/mobile-airtime";
import InternetSubscription from "../pay-bills/internet-subscription";
import CableTv from "../pay-bills/cable-tv";
import PaymentMethod from "../payment-methods";
import AddToCardForm from "../payment-methods/add-new-card";
import WalletHistory from "./walletHistory";
import PropagateLoader from "react-spinners/PropagateLoader";
import { usePointsHistoryStore } from "@/store/usePointsStore";
import CardHistory from "./cardHistory";
import GoPointsHistory from "./goPointsHistory";
import { useWalletStore } from "@/store/useWalletStore";
import CreatePinModal from "../wallet-pin/CreatePinModal";
import { checkPinStatus } from "@/axios/endpoints/wallet.endpoint";

const MiddleSection = () => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");
  const networkTab = searchParams.get("pay-bill");
  const {
    fetchWalletData,
    checkBalance,
    getWalletTransactions,
    getAllWalletData,
    isLoading,
    pinStatus,
    setPinStatus,
  } = useWalletStore();

  const checkPin = async () => {
    try {
      const response = await checkPinStatus();

      if (response.success && response.data[0]?.createdStatus) {
        setPinStatus(true);
      } else {
        setPinStatus(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (path === "/gopal/wallet") router.push("/gopal/wallet?tab=wallet");
  }, []);

  useEffect(() => {
    checkPin();
    getAllWalletData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] grid place-items-center">
        <PropagateLoader color="#0D6EFD" />
      </div>
    );
  } else {
    return (
      <div className="mb-10">
        <div className="h-max rounded bg-white">
          <div className="p-4">
            <h1 className="font-bold text-2xl">Wallet</h1>
          </div>

          <Tab data={LINK_DATA} />

          {currentTab === "wallet" && <WalletHome />}
          {currentTab === "my-cards" && <MyCards />}
          {currentTab === "go-points" && <GoPoints />}
          {currentTab === "pay-bills" && <PayBills />}
          {networkTab === "mobile-airtime" && <MobileAirtime />}
          {networkTab === "internet-subscription" && <InternetSubscription />}
          {networkTab === "cable-tv" && <CableTv />}
          {currentTab === "payment-methods" && <PaymentMethod />}
          {currentTab === "add-new-card" && <AddToCardForm />}
        </div>

        {currentTab === "wallet" && <WalletHistory />}
        {currentTab === "my-cards" && <CardHistory />}
        {currentTab === "go-points" && <GoPointsHistory />}

        {!pinStatus && <CreatePinModal />}
      </div>
    );
  }
};

export default MiddleSection;
