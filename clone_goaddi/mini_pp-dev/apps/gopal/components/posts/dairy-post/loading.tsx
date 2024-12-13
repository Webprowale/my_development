import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

const PostLoading = (props: Props) => {
  return (
    <>
      {[1, 2, 3, 4].map((l) => {
        return (
          <div
            key={l}
            className="max-w-[900px] w-full flex flex-col md:gap-7 gap-5 bg-white shadow-sm py-3 mt-7 px-7 rounded-[4px]"
          >
            <div className="flex justify-between items-center ">
              <div className="flex items-center space-x-4 ">
                <Skeleton className="md:w-16 md:h-16 w-14 h-14 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 md:w-[250px] w-[180px]" />
                  <Skeleton className="h-4 md:w-[200px] w-[120px]" />
                </div>
              </div>
            </div>
            {/* Post Text */}
            <Skeleton className="h-28 w-full" />
            <div className="grid grid-cols-2 grid-rows-2 gap-3 w-full md:h-[400px] h-[200px]">
              {[1, 2, 3, 4].map((s) => {
                return <Skeleton key={s} className="w-full h-full" />;
              })}
            </div>
            <div className="flex gap-4 items-center">
              {[1, 2, 3, 4].map((s) => {
                return <Skeleton key={s} className="w-10 h-10 rounded-full" />;
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostLoading;
