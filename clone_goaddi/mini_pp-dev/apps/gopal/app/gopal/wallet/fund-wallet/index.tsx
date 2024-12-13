"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WalletIcon } from "../assets/svg/wallet-icon";
import WalletBackground from "../assets/wallet-background.png";
import { WalletButton } from "../components/wallet-button";
import { FundWalletIcon } from "../assets/svg/fund-wallter.tsx";
import { TransferFundsIcon } from "../assets/svg/transfer-funds.tsx";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ModalLayout from "../components/modal-layout";
import FundWallet from "./modal-content/fund-wallet";
import BankTransfer from "../transfer-funds/modal-content/bank-transfer";
import { default as BnkTransfer } from "./modal-content/bank-transfer";
import ShareUser from "./modal-content/share-user";
import { ChooseACard } from "./modal-content/choose-a-card";
import { DebitCardModalContent } from "./modal-content/debit-card";
import ConfirmTransfer from "../transfer-funds/modal-content/confirm-transfer";
import { AllTransactionsIcon } from "../assets/svg/all-transactions";
// import { TransactionCards } from "../transaction-history/transactions/transaction-card";
import { PaginationDemo } from "../components/pagination";
import { useWalletStore } from "@/store/useWalletStore";
import { addCommasToNumber } from "@/utils";
import TransactionSuccessful from "../transfer-funds/modal-content/transaction-successful";
import { ArrowsClockwise, EyeClosed } from "@phosphor-icons/react";
import TransferPinModal from "../wallet-pin/TransferPinModal";

const WalletHome = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("wallet");
  const [isOpen, setIsOpen] = useState(false);
  const { balanceData, balanceLoader, refreshBalance } = useWalletStore();

  return (
    <>
      <div className="px-4 py-6 md:w-[375px] w-full overflow-hidden">
        <div className="flex relative bg-primary600 rounded overflow-hidden">
          <div className="z-50 p-4">
            <WalletIcon />
            <div className="text-white pt-4">
              <p className="text-xs">Wallet Balance</p>
              <div className="flex justify-between">
                <p className="text-3xl font-bold">
                  <span className="uppercase">{balanceData?.currency}</span>{" "}
                  {addCommasToNumber(balanceData?.availableBalance || 0)}
                </p>
              </div>
            </div>
          </div>

          <span title="refresh balance">
            <ArrowsClockwise
              className={`absolute top-4 right-4 z-20 cursor-pointer text-white ${balanceLoader ? "animate-spin" : null}`}
              size={22}
              onClick={() => {
                refreshBalance();
              }}
            />
          </span>

          {/* <p className=" top-2 right-2 absolute">
            <EyeClosed size={22} color="#ffffff" weight="bold" />
          </p> */}

          <Image
            src={WalletBackground}
            alt="walletimage"
            className="absolute -bottom-2 -right-2 h-28 "
          />
        </div>

        <div className="flex items-center justify-between mt-3 space-x-4">
          <WalletButton
            icon={<FundWalletIcon />}
            text="Fund Wallet"
            onClick={() => {
              router.push("wallet?tab=wallet&wallet=fund-wallet");
              setIsOpen(true);
            }}
          />

          <WalletButton
            icon={<TransferFundsIcon />}
            text="Transfer Funds"
            onClick={() => {
              router.push(`wallet?tab=wallet&wallet=transfer-funds`);
              setIsOpen(true);
            }}
          />
        </div>

        {currentTab === "fund-wallet" && (
          <ModalLayout
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeModalRoute={"wallet?tab=wallet"}
          >
            <FundWallet closeModal={() => setIsOpen(false)} />
          </ModalLayout>
        )}

        {currentTab === "transfer-funds" && (
          <ModalLayout
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeModalRoute={"/gopal/wallet?tab=wallet"}
          >
            <BankTransfer closeModal={() => setIsOpen(false)} />
          </ModalLayout>
        )}

        {/* Method of Fund Wallet  */}

        {currentTab === "share" && (
          <ModalLayout
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeModalRoute={"/gopal/wallet?tab=wallet"}
          >
            <ShareUser closeModal={() => setIsOpen(false)} />
          </ModalLayout>
        )}

        {currentTab === "transfer" && (
          <ModalLayout
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeModalRoute={"/gopal/wallet?tab=wallet"}
          >
            <BnkTransfer closeModal={() => setIsOpen(false)} />
          </ModalLayout>
        )}

        {currentTab === "debit" && (
          <ModalLayout
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeModalRoute={"/gopal/wallet?tab=wallet"}
          >
            <DebitCardModalContent closeModal={() => setIsOpen(false)} />
          </ModalLayout>
        )}

        {/* Method of transfering funds */}
        {currentTab === "confirm-transfer" && (
          <ModalLayout
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeModalRoute={"/gopal/wallet?tab=wallet"}
          >
            <ConfirmTransfer closeModal={() => setIsOpen(false)} />
          </ModalLayout>
        )}

        {/* confirm transaction  */}
        {currentTab === "successful-transaction" && (
          <ModalLayout
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeModalRoute={"/gopal/wallet?tab=wallet"}
          >
            <TransactionSuccessful
              title="Transaction Successful"
              text="Your transfer has been completed successfully"
              closeModal={() => setIsOpen(false)}
            />
          </ModalLayout>
        )}

        <TransferPinModal />
      </div>
    </>
  );
};

export default WalletHome;
