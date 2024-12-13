"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const SubscribedMessage = () => {
  return (
    <main className="min-h-[80vh] bg-white rounded grid place-items-center relative w-[97%] xl:max-w-[1410px] mx-auto p-10">
      <div className="bg-white w-full md:w-[55%] rounded-lg">
        <Image
          src={"/assets/subscription/sub-success.svg"}
          width={726}
          height={310}
          alt=""
          className="w-full"
        />
        <div className="flex flex-col items-center text-center my-4">
          <h3 className="font-bold text-[1.75rem]">Thanks for subscribing!</h3>
          <p className="mt-3 mb-6 text-sm px-6">
            Now you have full access to exclusive content, discounts, and
            priority support. Dive in and explore the premium experience!"
          </p>

          <div className="flex items-center gap-2">
            <Link
              href={"/gopal"}
              className="inline-block bg-primary100 hover:bg-primary200 ease-linear duration-150 text-primary600 font-semibold py-3 px-6 text-sm rounded"
            >
              Go home
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
    </main>
  );
};

export default SubscribedMessage;
