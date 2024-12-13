"use client";
import { Verified, Visible } from "@/assets/icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React, { useState, useEffect } from "react";
import { getInitials } from "@/utils";
import GoButton from "@/components/goui/button";
import { ArrowRight } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getPopularAccounts } from "@/axios/endpoints/onboarding.endpoint";
import { toast } from "sonner";
import { getRecommendedPeople } from "@/axios/endpoints/recommendedfollow.endpoints";

type Props = {};

const Recommendations = ({}: Props) => {
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchConnections = async () => {
      setLoading(true);

      try {
        const response = await getPopularAccounts();

        const recommendedAccount = await getRecommendedPeople();

        console.log("Popular Accounts", recommendedAccount);

        // setConnections(response?.data?.accounts);

        setConnections(recommendedAccount?.result);

        setLoading(false);
      } catch (error) {
        toast.success("Something went wrong", {
          duration: 2000,
        });
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);
  return (
    <div className="bg-white w-full px-4 py-4 rounded-sm ">
      <h4 className="font-semibold md:text-sm text-xs">
        Recommended Connections
      </h4>
      <ul className="flex-col mt-3">
        {connections?.slice(0, 3).map((recom) => {
          const { user_id, name, profile_image, is_verified } = recom;

          return (
            <div key={user_id} className="flex items-center justify-between ">
              <div
                className="flex gap-2 py-2 items-center cursor-pointer"
                onClick={() => {
                  // router.push(`/gopal/profile/${id}`)
                }}
              >
                <Avatar className="md:w-9 md:h-9 w-8 h-8 cursor-pointer">
                  <AvatarImage src={profile_image} />
                  <AvatarFallback>{getInitials(name)}</AvatarFallback>
                </Avatar>
                <Link
                  className="flex flex-col"
                  href={`/gopal/profile/${user_id}`}
                >
                  <div className="inline-flex items-center gap-2">
                    <h2 className="font-satoshi font-medium md:text-sm text-xs">
                      {name}
                    </h2>
                    {is_verified == "1" ? <Verified className="w-3 h-3" /> : ""}
                  </div>
                </Link>
              </div>
              <div className="">
                <GoButton>Follow</GoButton>
              </div>
            </div>
          );
        })}
      </ul>
      <div className="flex justify-end w-full mt-5">
        <div className="text-primary600 flex justify-end items-center gap-1">
          <p className="text-sm font-semibold">Show more</p>
          <ArrowRight weight="bold" className="text-primary600" />
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
