import { GoAuthButton } from "@/components/goui/button";
import { naira } from "@/utils/money";
import React from "react";

type Props = {};

const AlatPayment = (props: Props) => {
  return (
    <div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex flex-col items-center gap-1">
          <div className="text-sm text-black">Total Price</div>
          <div className="text-black font-semibold text-xl">
            {naira("234245")}
          </div>
        </div>
        <div className="">
          <GoAuthButton
            type="submit"
            // loading={loading}
            className="w-full py-2 md:text-sm mt-4"
          >
            Complete Booking
          </GoAuthButton>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default AlatPayment;
