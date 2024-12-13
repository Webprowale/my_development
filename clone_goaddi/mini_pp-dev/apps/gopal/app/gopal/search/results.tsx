import React from "react";
import { searchUsers } from "@/axios/endpoints/post.endpoint";
import { Button } from "@/components/ui/button";
import { Users } from "@phosphor-icons/react/dist/ssr";

interface ISearchResult {
  id: string;
  name: string;
  firstname: string;
  picture: string;
  follows: boolean;
  followers: string;
  following: string;
  lastname: string;
}
const SearchResults = async ({ searchParams }: { searchParams: any }) => {
  if (!searchParams) {
    return null;
  }

  const searchResults = await searchUsers({
    keyword: searchParams.search ?? "",
    type: "user",
  });

  if (!searchResults.result) {
    return;
  }
  return (
    <div className="space-6 bg-white rounded-sm mt-5">
      {searchResults?.result?.length &&
        searchResults?.result?.map((s: ISearchResult, index: number) => {
          const {
            firstname,
            lastname,
            picture,
            followers,
            following,
            follows,
            id,
          } = s;
          return (
            <div key={id} className="flex items-center justify-between p-4">
              <div
                key={id}
                className="flex flex-row gap-2  py-2 last:mb-0 last:pb-0"
              >
                <p className=" w-16 h-16">
                  <img src="/assets/AvatarS.png" alt="avatar" />
                </p>

                <div className=" space-y-1">
                  <p className="flex text-xl capitalize font-semibold leading-none">
                    <span>
                      {firstname} {lastname}
                    </span>
                  </p>
                  <p className="grid text-sm gap-2 font-normal text-[#676E7E]">
                    <p>@pam_bea24</p>
                    {/* <p className="w-4/6">
                          Passionate cook, always on the lookout for new
                          flavors! Combining culinary adventures with travel
                          explorations. Let's explore the world, one delicious
                          bite at a time!
                        </p> */}
                    <p className="flex gap-1 items-center">
                      <Users size={20} color="#667185" /> Followers: {followers}
                    </p>
                  </p>
                </div>
              </div>

              <Button className=" cursor-pointer">Follow</Button>
            </div>
          );
        })}
    </div>
  );
};

export default SearchResults;
