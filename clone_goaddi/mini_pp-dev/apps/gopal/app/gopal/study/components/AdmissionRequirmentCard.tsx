"use client";
import { CheckCircle } from "@phosphor-icons/react";

type Prop = {
  title: string;
  // icon:React.ReactElement
};
const AdmissionRequirmentCard = ({ title }: Prop) => {
  return (
    <div className=" w-[100%] border-[1px] border-[#CFE2FF] flex items-center gap-[0.891rem] p-[1rem] md:px-[1.141rem] md:py-[1.328rem] rounded-[4px]">
      {/* icon */}
      <CheckCircle
        style={{
          color: "#0D6EFD",
        }}
        size={35}
      />
      <p className="font-[700] text-[1.125rem]">{title}</p>
    </div>
  );
};

export default AdmissionRequirmentCard;
