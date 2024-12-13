"use client";
import { Suspense } from "react";
import SearchResults from "./SearchResults";

const Page = () => {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
};

export default Page;
