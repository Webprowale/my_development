import Button from "../../components/ft-button";
import { Check } from "../../assets/svg/check";
import { useRouter } from "next/navigation";
import { useWalletStore } from "@/store/useWalletStore";

const TransactionSuccessful = ({
  title,
  text,
  closeModal,
}: {
  title: string;
  text: string;
  closeModal: Function;
}) => {
  const router = useRouter();
  const { checkBalance, getWalletTransactions } = useWalletStore();

  return (
    <div className="bg-white">
      <div className="relative">
        <div className="absolute flex items-center justify-center h-[80px] mt w-[78px] bg-[#E7F6EC]">
          <Check />
        </div>
        <img
          src="/assets/modal-lines.svg"
          alt="Horizontal Line Icon"
        />
      </div>

      <div className="mt-5">
        <p className="font-bold text-lg">{title}</p>
        <p className="text-gray-400 text-sm w-[250px] font-thin">{text}</p>
      </div>

      <div className="mt-5">
        <Button
          onClick={() => {
            checkBalance();
            getWalletTransactions();
            router.push("/gopal/wallet?tab=wallet");
          }}
          text="View Transaction"
          className="bg-[#F9FAFB] border mt-5 text-primary600 border-primary100"
        />
        <Button
          onClick={() => {
            checkBalance();
            getWalletTransactions();
            router.push("/gopal/wallet?tab=wallet");
          }}
          text="Back To Wallet"
          className="bg-white text-primary600 mt-2 w-full border rounded "
        />
      </div>
    </div>
  );
};

export default TransactionSuccessful;
