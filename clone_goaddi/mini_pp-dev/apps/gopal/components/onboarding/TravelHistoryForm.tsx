"use client";

import Interests from "./interests/Interests";
import {
  AirplaneInFlight,
  Article,
  Chair,
  Chalkboard,
  ChalkboardSimple,
  House,
  Path,
  PersonSimple,
  PersonSimpleThrow,
  Pill,
  SuitcaseRolling,
  SwimmingPool,
  Warehouse,
  Webcam,
  Wine,
} from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { useState } from "react";
import { setInterest } from "@/axios/endpoints/onboarding.endpoint";
import { GoAuthButton } from "../goui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Inputs = {
  example: string;
  exampleRequired: string;
};

const TravelHistoryForm = () => {
  const [loading, setLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const loadingId = toast.loading("Setting up your interests");

    console.log(selectedInterests);

    try {
      if (selectedInterests.length < 3) {
        const { success } = await setInterest({ interest: selectedInterests });

        if (success) {
          toast.success("Interests set up successfully", {
            id: loadingId,
            duration: 2000,
          });

          setTimeout(() => {
            router.push("/onboarding/gopal?step=connect");
          }, 1000);
        } else {
          toast.success("Something went wrong", {
            id: loadingId,
            duration: 2000,
          });
        }

        setLoading(false);
      }
    } catch (error) {
      toast.success("Something went wrong", {
        id: loadingId,
        duration: 2000,
      });
      setLoading(false);
    }
  };

  const handleChange = (interest: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedInterests((prevInterests) => [...prevInterests, interest]);
    } else {
      setSelectedInterests((prevInterests) =>
        prevInterests.filter((item) => item !== interest),
      );
    }
  };

  return (
    <>
      <header className="mb-10">
        <h1 className="font-semibold text-[2.25rem] text-[#1D2433]">
          Discover Your Travel Style
        </h1>
        <p className="text-[#676E7E] font-medium">
          Choose from a list of options that reflect your travel preferences
        </p>
      </header>

      <form onSubmit={handleSubmit} className="">
        <div className="grid grid-cols-5 gap-3 w-full mb-10">
          {interestList.map((interest: any, index: number) => (
            <Interests
              key={index}
              id={interest.id}
              label={interest.label}
              icon={interest.icon}
              name="interest"
              onChange={handleChange}
            />
          ))}
        </div>

        <GoAuthButton
          type="submit"
          disabled={loading || selectedInterests.length < 3}
          loading={loading}
          className="w-full py-3 md:text-sm mt-8 font-medium transition-all col-start-1 col-end-6"
        >
          Next
        </GoAuthButton>
      </form>
    </>
  );
};

const interestList = [
  {
    id: "study",
    label: "Study",
    icon: (
      <Chalkboard
        size={25}
        weight="bold"
        className="interest-icon text-[#344054]"
      />
    ),
  },
  {
    id: "medi",
    label: "Medical",
    icon: <Pill size={25} className="interest-icon text-[#344054]" />,
  },
  {
    id: "imm",
    label: "Immigration",
    icon: (
      <SuitcaseRolling size={25} className="interest-icon text-[#344054]" />
    ),
  },
  {
    id: "vaca",
    label: "Vacation",
    icon: <Wine size={25} className="interest-icon text-[#344054]" />,
  },
  {
    id: "visa",
    label: "Visa",
    icon: <Article size={25} className="interest-icon text-[#344054]" />,
  },
  {
    id: "flight",
    label: "Flights",
    icon: (
      <AirplaneInFlight size={25} className="interest-icon text-[#344054]" />
    ),
  },
  {
    id: "ware",
    label: "Hotels",
    icon: <Warehouse size={25} className="interest-icon text-[#344054]" />,
  },
  {
    id: "act",
    label: "Activities",
    icon: <Path size={25} className="interest-icon text-[#344054]" />,
  },
  {
    id: "train",
    label: "Training",
    icon: (
      <ChalkboardSimple size={25} className="interest-icon text-[#344054]" />
    ),
  },
  {
    id: "seminar",
    label: "Seminar",
    icon: <Chair size={25} className="interest-icon text-[#344054]" />,
  },
  {
    id: "event",
    label: "Event",
    icon: <PersonSimple size={25} className="interest-icon text-[#344054]" />,
  },
  {
    id: "conf",
    label: "Conference",
    icon: <Webcam size={25} className="interest-icon text-[#344054]" />,
  },
  {
    id: "esta",
    label: "Real estate",
    icon: (
      <House
        size={25}
        className="interest-ico
        n text-[#344054]"
      />
    ),
  },
];

export default TravelHistoryForm;
