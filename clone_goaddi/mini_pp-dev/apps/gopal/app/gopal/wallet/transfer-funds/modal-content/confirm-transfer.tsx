import Link from "next/link";
import Button from "../../components/ft-button";
import WalletModal from "../components/wallet-modal";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWalletStore } from "@/store/useWalletStore";
import { useState } from "react";
import { transferToWallet } from "@/axios/endpoints/wallet.endpoint";
import { toast } from "sonner";
import { addCommasToNumber } from "@/utils";

const ConfirmTransfer = ({ closeModal }: { closeModal: Function }) => {
  const router = useRouter();
  const { transferDetails, setTransferDetails } = useWalletStore();

  return (
    <WalletModal
      title="Confirm Transfer"
      text="Review the details of your transaction"
      children={
        <div className="mt-5">
          <div className="mt-5 space-y-3 p-3 rounded border">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm">Amount to be sent</p>
              <p className="font-bold text-xl">
                NGN {addCommasToNumber(Number(transferDetails?.amount))}
              </p>
            </div>
          </div>

          <Button
            onClick={() => {
              router.push("/gopal/wallet?tab=wallet&wallet=transfer-pin");
            }}
            text="Next"
            isLoading={false}
            className="bg-primary600 border mt-5 text-white"
          />

          <Button
            onClick={() => {
              router.push("/gopal/wallet?tab=wallet&wallet=transfer-funds");
            }}
            text="Go back"
            isLoading={false}
            className="bg-white text-black border mt-2 w-full"
          />
        </div>
      }
    />
  );
};

export default ConfirmTransfer;
