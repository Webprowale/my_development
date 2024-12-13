"use client";
import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TravellerInformation from "./traveller-information";
import Review from "./review";
import SecurePayment from "./payment";
import Confirmation from "./confirmation";

const Tabs = (props: any) => {
  const router = useRouter();
  const mode = useSearchParams();

  useEffect(() => {
    const step = mode.get("step");
    if (
      !step ||
      !["information", "review", "payment", "confirmation"].includes(step)
    ) {
      router.replace("/gopal/trip-planner/trip-booking-flow?step=information");
    }
  }, []);

  return (
    <>
      {mode.get("step") === "information" && <TravellerInformation />}
      {mode.get("step") === "review" && <Review />}
      {mode.get("step") === "payment" && <SecurePayment />}
      {mode.get("step") === "confirmation" && <Confirmation />}
    </>
  );
};

export default Tabs;
