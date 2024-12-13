import { searchUsers } from "@/axios/endpoints/post.endpoint";
import { Button } from "@/components/ui/button";
import SearchResults from "./results";
import { Suspense } from "react";

const SearchPage = ({ searchParams }: { searchParams: any }) => {
  if (!searchParams) {
    return null;
  }
  return (
    <div className="space-6 bg-white rounded-sm">
      <div className="flex gap-2 p-6">
        <Button className="bg-[#F0F2F5] text-black hover:text-white w-[82px]">
          People
        </Button>
        <Button className="bg-[#F0F2F5] text-black hover:text-white  w-[82px]">
          Post
        </Button>
      </div>
      <Suspense fallback={<div>Loading</div>}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
