//@ts-nocheck
"use-client";
import { Suspense } from "react";
import MiddleSection from "./sections/middle";

const Wallet = () => {
  return (
    <>
      <Suspense>
        <MiddleSection />
      </Suspense>
    </>
  );
};

export default Wallet;
