"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const GoBack = ({ className }: { className?: string }) => {
  const router = useRouter();
  // go back
  const goBack = () => {
    router.back();
  };
  return (
    <button
      className={cn(
        "absolute top-4 left-4 w-[40px] h-[40px] rounded bg-[#FFFFFF33] grid place-items-center",
        className,
      )}
      onClick={() => {
        goBack();
      }}
    >
      <ArrowLeft
        size={20}
        weight="bold"
        className="text-[#344054]"
      />
    </button>
  );
};

export default GoBack;
