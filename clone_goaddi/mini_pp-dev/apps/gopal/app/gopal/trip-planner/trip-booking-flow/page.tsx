"use client";
import React, { Suspense } from "react";
import Tabs from "./components/tabs/tabs";

const TripBookingFlow = (props: any) => {
  return (
    <Suspense>
      <div>
        <Tabs />
      </div>
    </Suspense>
  );
};

export default TripBookingFlow;
