'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, {  useEffect } from "react";
import TravellerInformation from "./traveller-information";
import Review from "./Review";
import SecurePayment from "./payments";
import Confirmation from "./Confirmation";


const Tabs = ()=>{
    const router = useRouter();
    const mode = useSearchParams();
    useEffect(() => {
        const step = mode.get("step");
        if (
          !step ||
          !["information", "review", "payment", "confirmation"].includes(step)
        ) {
          router.replace("/gopal/hotels/bookings?step=information");
        }
      }, []);
    
    return (
        <div  className="w-[100%]">
        {mode.get("step") === "information" && <TravellerInformation />}
        {mode.get("step") === "review" && <Review />}
        {mode.get("step") === "payment" && <SecurePayment />}
        {mode.get("step") === "confirmation" && <Confirmation />}
      </div>
  
    )
}

export default Tabs