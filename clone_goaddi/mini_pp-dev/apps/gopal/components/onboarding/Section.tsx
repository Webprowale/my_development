"use client";
import { useEffect } from "react";
import TravelHistoryForm from "./TravelHistoryForm";
import ConnectionsForm from "./connect/ConnectionsForm";
import ProfileForm from "./profile-setup/ProfileForm";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { getUserId } from "@/lib/get-userId";

const Section = () => {
  const router = useRouter();
  const mode = useSearchParams();

  useEffect(() => {
    const step = mode.get("step");
    if (!step || !["profile", "interest", "connect"].includes(step)) {
      router.replace("/onboarding/gopal?step=profile");
    }

    getUserId();
  }, []);

  return (
    <>
      <Suspense>
        {mode.get("step") === "profile" && <ProfileForm />}
        {mode.get("step") === "interest" && <TravelHistoryForm />}
        {mode.get("step") === "connect" && <ConnectionsForm />}
      </Suspense>
    </>
  );
};

export default Section;
