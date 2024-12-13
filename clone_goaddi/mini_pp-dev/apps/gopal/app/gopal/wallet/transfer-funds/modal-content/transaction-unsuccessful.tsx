import Image from "next/image";
import HorizontalLineIcon from "../../assets/horizontal-line.png";
import Button from "../../components/ft-button";
import { Cancel } from "../../assets/svg/cancel";

const TransactionUnsuccessful = ({ closeModal }: { closeModal: Function }) => {
  return (
    <div className="bg-white">
      <div className="relative">
        <div className="absolute flex items-center justify-center h-[80px] mt w-[78px] bg-[#FEF4E6]">
          <Cancel />
        </div>
        <Image src={HorizontalLineIcon} alt="Horizontal Line Icon" />
      </div>

      <div className="mt-5">
        <p className="font-bold text-lg">Transfer Unsuccessful</p>
        <p className="text-gray-400 text-sm w-[250px] font-thin">
          Something went wrong on our end. Please try again
        </p>
      </div>

      <Button
        onClick={closeModal}
        text="Back to Wallet"
        className="bg-[#F9FAFB] border mt-10 text-primary600"
      />
    </div>
  );
};

export default TransactionUnsuccessful;
