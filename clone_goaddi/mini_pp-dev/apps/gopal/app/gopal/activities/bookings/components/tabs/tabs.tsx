"use client";
import React, { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TravellerInformation from "./traveller-information";
import Review from "./Review";
import SecurePayment from "./payments";
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
      router.replace("/gopal/activities/bookings?step=information");
    }
  }, []);

  return (
    <div>
      {mode.get("step") === "information" && <TravellerInformation />}
      {mode.get("step") === "review" && <Review />}
      {mode.get("step") === "payment" && <SecurePayment />}
      {mode.get("step") === "confirmation" && <Confirmation/>}

    </div>
  );
};

export default Tabs;
