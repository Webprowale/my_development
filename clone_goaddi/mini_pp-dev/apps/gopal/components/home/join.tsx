import React from "react";
import GoButton from "../goui/button";

type Props = {};

const JoinUs = (props: Props) => {
  return (
    <div className="">
      <div className="max-w-[1470px] mx-auto bg-primary700 rounded-sm px-7 pt-6 mb-8">
        <div className="flex justify-between items-end">
          <div className="max-w-xl w-full mb-36">
            <h3 className="text-3xl font-bold text-white">
              Experience the world your way
            </h3>
            <p className="text-base text-white my-5">
              GoPaddi is your best shot at traveling the world and connecting
              with others doing the same.
            </p>

            <GoButton className="px-24 py-2.5 rounded-sm">Get Started</GoButton>
          </div>
          <img
            src="/assets/landing/join-us.svg"
            className="w-52 h-full mt-14 md:mr-20"
            alt="Join us at gopaddi"
          />
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
