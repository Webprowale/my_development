"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

import TravelHistoryForm from "../TravelHistoryForm";
import ConnectionsForm from "../connect/ConnectionsForm";
import BusinessForm from "../profile-setup/BusinessForm";
import DocumentUpload from "../document-upload/DocumentUpload";
import FamilyForm from "../profile-setup/FamilyForm";
import { getUserId } from "@/lib/get-userId";

const Section = () => {
  const mode = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const step = mode.get("step");
    if (!step || !["profile", "interest", "connect"].includes(step)) {
      router.replace("/onboarding/gofamily?step=profile");
    }

    getUserId();
  }, []);

  return (
    <>
      {mode.get("step") === "profile" && <FamilyForm />}
      {mode.get("step") === "document" && <DocumentUpload />}
    </>
  );
};

export default Section;
