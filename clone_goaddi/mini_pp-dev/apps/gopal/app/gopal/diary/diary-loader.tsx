import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Diaryloading() {
  return (
    <>
      <div className="w-full grid grid-cols-4 gap-2 h-[400px]">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((l) => (
          <div className="w-full flex flex-col gap-2 mt-[40px]" key={l}>
            <Skeleton className="h-60 rounded object-cover" />

            <Skeleton className="h-5 w-full" />

            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </>
  );
}
