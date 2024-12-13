"use client";

import { X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const SuccessModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();
  const mode = useSearchParams();
  const currentPath = usePathname();

  const handleClose = () => {
    router.push(`${currentPath}?step=plan`);
  };

  useEffect(() => {
    if (mode.get("success")) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (event: any) => {
        if (event.key === "Escape") {
          router.push(`${currentPath}?step=plan`);
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 w-full h-screen max-h-screen bg-[#00000079] grid place-items-center z-50 backdrop-blur-sm">
          <div className="bg-white w-full md:w-[35%] h-auto  max-h-[95vh] p-6 rounded overflow-auto scrollbar-thin">
            <header className="relative z-10 mb-8">
              <Image
                src={`/assets/modal-success.svg`}
                width={70}
                height={70}
                className="mb-4"
                alt=""
              />

              <h3 className="font-semibold text-xl mb-2">
                We Will Be In Touch
              </h3>
              <p className="text-sm text-[#647995] w-full md:w-[68%]">
                Your inquiry has been submitted successfully.
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

            {/* main */}
            <section className="">
              <p className="text-sm text-[#647995] w-full">
                We will reach out to you on next steps within 1 - 2 business
                days.
              </p>
              <p className="text-sm text-[#647995] w-full">
                You can track the status of your inquiry on{" "}
                <Link
                  href={"#"}
                  className="text-primary600"
                >
                  My Application
                </Link>{" "}
                page.
              </p>

              <div className="ctas flex items-center gap-2 mt-4">
                <Link
                  href={"#"}
                  className="bg-primary600 text-white rounded p-4 text-sm hover:bg-primary700 ease-linear duration-150"
                >
                  Track Inquiry Status
                </Link>
                <Link
                  href={"/gopal/medical"}
                  className="bg-primary100 text-primary600 rounded p-4 text-sm hover:bg-primary200 ease-linear duration-150"
                >
                  Explore Other Medical Services
                </Link>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessModal;
