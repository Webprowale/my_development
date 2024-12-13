"use client";

import Image from "next/image";
import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { X } from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePostStore } from "@/store/usePostStore";

const SuccessModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();
  const mode = useSearchParams();
  const currentPath = usePathname();

  const { reportPostSuccess, setReportPostSucess } = usePostStore(
    (state) => state,
  );

  const handleClose = () => {
    setReportPostSucess(false);
    router.push(`${currentPath}`, { scroll: false });
  };

  return (
    <div className="report-modal fixed inset-0 w-full h-screen max-h-screen bg-[#00000024] grid place-items-center z-50 backdrop-blur-sm">
      <div className="bg-white w-full md:w-[50%] h-auto  max-h-[95vh] p-6 rounded overflow-auto scrollbar-thin">
        <header className="relative z-10 mb-10">
          <h2 className="font-semibold text-xl mb-2 ">Thanks for Reporting!</h2>
          <p className="text-sm text-[#647995] w-full md:w-[68%] ">
            Thanks for keeping the community safe
          </p>

          <X
            size={24}
            weight="bold"
            className="absolute right-0 top-[10px] cursor-pointer"
            onClick={() => {
              handleClose();
            }}
          />
          <img
            src="/assets/modal-lines.svg"
            className="absolute left-0 right-0 top-0 w-full -z-[1]"
            alt=""
          />
        </header>

        <section className="relative z-20">
          <p>
            Your report about racial slurs and discrimination has been
            submitted. We will review the content and take appropriate action
            according to our{" "}
            <Link
              href={"#"}
              className="text-primary600 underline underline-offset-1"
            >
              community guidelines.
            </Link>{" "}
            You can expect a response within 24 hours.
          </p>

          <h3 className="font-semibold mt-4 mb-2">How We'll Get Back to You</h3>
          <p>
            We'll send you a notification to view the outcome as soon as
            possible. This notification will detail the specific action taken
            (if any) regarding the reported content.
          </p>

          <Button
            className="w-full mt-8 p-6 rounded hover:bg-primary700"
            onClick={() => {
              handleClose();
            }}
          >
            Done
          </Button>
        </section>
      </div>
    </div>
  );
};

export default SuccessModal;
