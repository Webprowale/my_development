"use client";
import Section from "@/components/onboarding/gofamily/Section";
import { Suspense } from "react";

const GoFamily = () => {
  return (
    <main>
      <Suspense>
        <Section />
      </Suspense>
    </main>
  );
};

export default GoFamily;
