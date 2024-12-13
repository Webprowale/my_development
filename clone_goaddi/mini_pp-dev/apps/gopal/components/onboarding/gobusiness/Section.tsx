"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import BusinessForm from "../profile-setup/BusinessForm";
import DocumentUpload from "../document-upload/DocumentUpload";
import { getUserId } from "@/lib/get-userId";

const Section = () => {
  const mode = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const step = mode.get("step");
    if (!step || !["profile", "interest", "connect"].includes(step)) {
      router.replace("/onboarding/gobusiness?step=profile");
    }

    getUserId();
  }, []);

  return (
    <>
      {mode.get("step") === "profile" && <BusinessForm />}
      {mode.get("step") === "document" && <DocumentUpload />}
    </>
  );
};

export default Section;
