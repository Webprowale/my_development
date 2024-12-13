"use client";

import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

const SubcriptionSuccessModal = () => {
  const successModal = useRef(null);
  const { setIsSubscribe } = useSubscriptionStore();

  const handleClickOutside = (event: any) => {
    console.log(successModal.current);
    console.log(event.target);
    console.log();

    if (successModal.current && successModal.current == event.target) {
      setIsSubscribe(false);
      console.log("modal closed");
    }
  };

  useEffect(() => {
    console.log(successModal?.current);
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-screen bg-[#00000081] z-[100] grid place-items-center"
      ref={successModal}
      onClick={handleClickOutside}
    >
      <div className="bg-white w-full md:w-[45%] p-5 rounded-lg">
        <Image
          src={"/assets/subscription/sub-success.svg"}
          width={400}
          height={310}
          alt=""
          className="w-full"
        />
        <div className="flex flex-col items-center text-center my-4">
          <h3 className="font-bold text-xl">Thanks for subscribing!</h3>
          <p className="mt-3 mb-6">
            Now you have full access to exclusive content, discounts, and
            priority support. Dive in and explore the premium experience!"
          </p>

          <div className="flex items-center gap-2">
            <Link
              href={"/gopal"}
              className="inline-block bg-primary100 hover:bg-primary200 ease-linear duration-150 text-primary600 font-semibold py-3 px-4 text-sm rounded"
            >
              Go to dashboard
            </Link>
            <Link
              href={"/gopal/settings/subscribe?tab=plans"}
              className="inline-block bg-primary600 hover:bg-primary700 ease-linear duration-150 text-white font-semibold py-3 px-4 text-sm rounded"
            >
              View billing info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcriptionSuccessModal;
