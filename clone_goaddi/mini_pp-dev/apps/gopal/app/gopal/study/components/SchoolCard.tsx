"use client";
import GoButton from "@/components/goui/button";
import { MapPin, ListPlus, Student } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const SchoolCard = ({img, location, name, list, student}: {img: string; location: string; name: string, list: string, student: string}) => {
  const route = useRouter();
  return (
    <div
      style={{
        boxShadow: "0px 10px 15px -3px #0000001A",
      }}
      className="p-[1.5rem] w-[100%] bg-white"
    >
      <div className="flex items-center gap-[0.375rem] pb-[1.375rem] border-b-[#E4E7EC] border-b-[1px] mb-[1.125rem]">
        <img className="block w-[32px] h-[32px]" src={img} alt="" />
        <p className="text-[#647995] font-[700] text-[1rem] ">{name}</p>
      </div>
      <div>{/* line */}</div>
      <div className="flex flex-col gap-[0.375rem]">
        <div className="text-[#676E7E] flex gap-[0.375rem] items-center font-[500] text-[0.875rem]">
          <MapPin size={20} />
          <p>{location}</p>
        </div>
        <div className="text-[#676E7E] flex gap-[0.375rem] items-center font-[500] text-[0.875rem]">
          <ListPlus size={20} />
          <p>{list}</p>
        </div>
        <div className="text-[#676E7E] flex gap-[0.375rem] items-center font-[500] text-[0.875rem]">
          <Student size={20} />
          <p>{student}</p>
        </div>
      </div>
      <GoButton
        className="w-full  mt-[1.125rem] rounded-[4px] py-[0.5rem]  bg-white text-primary hover:bg-primary hover:text-white"
        onClick={() => {
          route.push("/gopal/study/programme");
        }}
      >
        See Programs
      </GoButton>
    </div>
  );
};

export default SchoolCard;
