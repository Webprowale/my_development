import TravelHistoryForm from "@/components/onboarding/TravelHistoryForm";
import ConnectionsForm from "@/components/onboarding/connect/ConnectionsForm";
import ProfileForm from "@/components/onboarding/profile-setup/ProfileForm";
import Section from "@/components/onboarding/Section";
import { Suspense } from "react";

const GoPal = () => {
  return (
    <main>
      <Suspense>
        <Section />
      </Suspense>
    </main>
  );
};

export default GoPal;
