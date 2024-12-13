"use client";

import { useState } from "react";
import Link from "next/link";
import WalletModal from "../../components/wallet-modal";
import ModalLayout from "../components/modal-layout";
import { WalletIcon } from "../../assets/svg/wallet-icon";
import Button from "../../components/ft-button";

const InsufficientFunds = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen} dir="infficinent-funds">
      <WalletModal
        title="Insufficient Funds"
        text="Looks like you have run out of funds in your wallet. Top up your wallet and try again"
        icon={<WalletIcon />}
        children={
          <div className="flex flex-col w-full space-y-3">
            <Link href="/gopal/wallet/pay-bills">
              <Button
                onClick={Function}
                text="Top Up Wallet"
                className="bg-primary600 text-white mt-8"
              />
            </Link>
            <Button
              onClick={() => setIsOpen(false)}
              text="Cancel"
              className="bg-white text-black border mt-2"
            />
          </div>
        }
      />
    </ModalLayout>
  );
};

export default InsufficientFunds;
