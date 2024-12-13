"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TopDestinations from "./components/top-destination";
import CuratedAdventures from "./components/curated-adventures";
import FAQs from "./components/faqs";
import SearchComponent from "./components/search-components";
import FeatureActivities from "@/components/activities/featured-activities";

const ActivitiesPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="space-y-6 mb-8">
      <SearchComponent isLoading={isLoading} setIsLoading={setIsLoading} />
      {/* <FeatureActivities /> */}
      {/* <TopDestinations /> */}
      {/* <CuratedAdventures /> */}
      <FAQs />
    </main>
  );
};

export default ActivitiesPage;
