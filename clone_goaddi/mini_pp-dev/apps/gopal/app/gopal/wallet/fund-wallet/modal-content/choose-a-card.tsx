import Image from "next/image";
import CardImg from "../../assets/mastercard_icon.jpeg.png";
import { FundIcon } from "../../assets/svg/fund-icon";
import { DebitCard } from "../../assets/svg/debit-card";
import { RightArrow } from "../../assets/svg/right-arrow";
import HorizontalLineIcon from "../../assets/horizontal-line.png";

export const ChooseACard = () => {
  return (
    <div className="bg-white">
      <div className="">
        <Image src={HorizontalLineIcon} alt="Horizontal Line Icon" />
      </div>

      <div className="flex flex-col items-center justify-center -mt-12 w-full">
        <div className="flex items-center justify-center h-[56px] w-[56px] rounded-full bg-[#E7F0FF]">
          <DebitCard />
        </div>
        <div className="flex flex-col items-center justify-center mt-4">
          <p className="font-bold text-lg">Choose a Card</p>
          <p className="text-gray-400 text-sm w-full">
            Select one of your saved payment methods
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-3 mt-5">
        <div className="flex items-center justify-between bg-[#F9FAFB] rounded mt-6 h-[87px] border px-4 w-full">
          <div className="flex items-center space-x-3">
            <Image src={CardImg} alt="cardimg alt" />
            <div className="">
              <p>••••7786</p>
              <p className="text-xs text-gray-400">Expires 06/2024</p>
            </div>
          </div>
          <RightArrow />
        </div>

        <div className="flex items-center justify-between bg-[#F9FAFB] rounded mt-6 h-[87px] border px-4 w-full">
          <div className="flex items-center space-x-3">
            <Image src={CardImg} alt="cardimg alt" />
            <div className="">
              <p>••••7786</p>
              <p className="text-xs text-gray-400">Expires 06/2024</p>
            </div>
          </div>
          <RightArrow />
        </div>

        <div className="flex items-center justify-between border bg-[#F9FAFB] rounded mt-6 h-[87px] px-4 w-full">
          <div className="flex items-center space-x-3">
            <FundIcon/> 
            <div className="">
              <p>Fund with a new Debit Card</p>
              <p className="text-xs text-gray-400">
                We accept Visa, Verve & Mastercard
              </p>
            </div>
          </div>
          <RightArrow />
        </div>
      </div>
    </div>
  );
};
