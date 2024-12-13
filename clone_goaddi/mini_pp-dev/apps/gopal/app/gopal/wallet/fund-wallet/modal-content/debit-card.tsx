import Link from "next/link";
import { useState } from "react";
import Button from "../../components/ft-button";
import { DebitCard } from "../../assets/svg/debit-card";

export const DebitCardModalContent = ({
  closeModal,
}: {
  closeModal: Function;
}) => {
  const [amount, setAmount] = useState("");

  return (
    <div className="bg-white">
      <div className="">
        <img src="/assets/modal-lines.svg" alt="Horizontal Line Icon" />
      </div>

      <div className="flex flex-col items-center justify-center -mt-12 w-full">
        <div className="flex items-center justify-center h-[56px] w-[56px] rounded-full bg-[#E7F0FF]">
          <DebitCard />
        </div>
        <div className="flex flex-col items-center justify-center mt-4">
          <p className="font-bold">Debit Card</p>
          <p className="text-gray-600 text-xs w-full">
            How much would you like to fund via card
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex flex-col space-y-1">
          <label className="text-sm">Amount to fund</label>
          <input
            onChange={(e) => setAmount(e.target.value)}
            className="rounded border h-[56px] text-sm p-3"
            placeholder="Enter an amount"
            type="number"
          />
        </div>

        <div className="mt-5 space-y-3 p-3 rounded border">
          <div className="flex items-center justify-between">
            <p className="text-xs">Amount to Fund</p>
            <p
              className={`text-sm ${amount ? "text-black font-semibold" : "text-gray-400"}`}
            >
              {amount
                ? `NGN ${parseFloat(amount).toLocaleString()}.00`
                : "Please enter an amount"}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs">Fees</p>
            <p className="font-semibold">{amount ? "1.20" : "NGN 0.00"}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm">Amount added to wallet</p>
            <p className="font-bold text-xl">
              {amount
                ? (parseFloat(amount) - 1.2).toLocaleString("en-US", {
                    style: "currency",
                    currency: "NGN",
                  })
                : "NGN 0.00"}
            </p>
          </div>
        </div>
      </div>

      <Link href="/gopal/wallet/fund-wallet/choose-a-card">
        <Button
          onClick={Function}
          text="Done"
          className={`text-white mt-5 ${amount ? "bg-primary600" : "bg-[#CFE2FF]"}`}
        />
      </Link>
      <Button
        onClick={closeModal}
        text="Go Back"
        className="bg-white text-black border mt-2"
      />
    </div>
  );
};
