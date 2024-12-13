import Section from "@/components/onboarding/gobusiness/Section";
import { Suspense } from "react";

const GoBusiness = () => {
  return (
    <main>
      <Suspense>
        <Section />
      </Suspense>
    </main>
  );
};

export default GoBusiness;
