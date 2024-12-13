"use client";

import Link from "next/link";
import Button from "../../components/ft-button";
import { BankIcon } from "../../assets/svg/bank-icon";
import WalletModal from "../../components/wallet-modal";
import { CopyIcon } from "../../assets/svg/copy-icon";
import { useState } from "react";
import {
  InitiateFundWallet,
  confirmFundWallet,
  getTransactions,
} from "@/axios/endpoints/wallet.endpoint";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useWalletStore } from "@/store/useWalletStore";
import { toast } from "sonner";

const BankTransfer = ({ closeModal }: { closeModal: Function }) => {
  const [transferAmount, setTransferAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const { checkBalance, getWalletTransactions } = useWalletStore();
  let config: any;

  const transferMoney = async () => {
    try {
      setIsLoading(true);
      const response = await InitiateFundWallet({ amount: transferAmount });

      setIsLoading(false);

      // after payment has been made
      // This function will confirm the payment in the flutterwave callback
      const confirmFundWalletPayment = async (data: any) => {
        try {
          const response = await confirmFundWallet(data);

          if (response?.success) {
            // Update the user balance and transaction history after funding wallet
            checkBalance();
            getWalletTransactions();
          } else {
            checkBalance();
            getWalletTransactions();
          }
          // console.log(response);
        } catch (error) {
          console.log(error);
        }
      };

      if (response?.success) {
        // FLUTTERWAVE CONFIG
        config = {
          public_key: process.env.NEXT_PUBLIC_FLUTTER_KEY,
          tx_ref: response?.data[0]?.paymentData[0]?.referenceNo,
          amount: response?.data[0]?.paymentData[0]?.amount,
          currency: response?.data[0]?.paymentData[0]?.currency,
          payment_options: "banktransfer",
          customer: {
            // email: paymentData?.userData[0]?.email,
            email: response?.data[0]?.paymentData[0]?.userData[0]?.email,
            phone_number:
              response?.data[0]?.paymentData[0]?.userData[0]?.phonenumber,
            name: response?.data[0]?.paymentData[0]?.userData[0]?.name,
          },
          customizations: {
            title: "Gopaddi",
            description: "Fund wallet",
            logo: "https://vgtechdemo.org/_next/image?url=%2Fassets%2Flogo-white.png&w=64&q=75",
          },
        };

        // init flutter wave SDK
        const handleFlutterPayment = useFlutterwave(config);

        handleFlutterPayment({
          callback: (response) => {
            // The flutterwave response
            console.log(response);

            // update the status on the database
            confirmFundWalletPayment({
              referenceNo: response?.tx_ref,
              transactionId: response?.transaction_id,
              paymentStatus: "successful",
            });

            // This will close the SDK after payment was successful
            closePaymentModal(); // this will close the modal programmatically
          },
          onClose: () => {},
        });
      } else {
        toast.error("An error occurred, try again");
      }
      console.log(response);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <WalletModal
      title="Bank Transfer"
      text="Make a transfer to this account number and your wallet will be funded immediately"
      icon={<BankIcon />}
      children={
        <>
          {/* <div className="flex items-center justify-center space-x-6 border h-[57px] w-full mt-8 pl-7">
            <div className="flex flex-col items-center">
              <p className="font-thin text-xs text-gray-400">WEMA BANK</p>
              <p className="text-xl font-bold">7820805514</p>
            </div>
            <CopyIcon />
          </div> */}
          <div className="flex flex-col gap-2 mt-8">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={transferAmount}
              placeholder="Enter amount to transfer"
              inputMode="numeric"
              onChange={(event) => setTransferAmount(event.target.value)}
              className="w-full min-h-[55px] appearance-none border rounded px-2"
            />
          </div>
          {/* <Link href="/gopal/wallet/transfer-funds/debit-card/"> */}
          <Button
            onClick={() => {
              transferMoney();
            }}
            isLoading={isLoading}
            text="Pay"
            className="bg-primary600 text-white mt-5"
          />
          {/* </Link> */}
          <Button
            onClick={closeModal}
            text="Go Back"
            className="bg-white text-black border mt-2"
          />
        </>
      }
    />
  );
};

export default BankTransfer;
