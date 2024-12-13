import React, { useEffect, useState } from "react";
import Connections from "./Connections";
import { Button } from "@/components/ui/button";
import { getPopularAccounts } from "@/axios/endpoints/onboarding.endpoint";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const ConnectionsForm = () => {
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchConnections = async () => {
      setLoading(true);

      try {
        const response = await getPopularAccounts();

        console.log("Popular Accounts", response);

        setConnections(response?.data?.accounts);

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
    <>
      <header className="mb-10">
        <h1 className="font-semibold text-[2.25rem] text-[#1D2433]">
          Connect and Explore
        </h1>
        <p className="text-[#676E7E] font-medium">
          Discover inspiring content and connect with other travelers by
          following accounts 
        </p>
      </header>

      {/* connect */}
      <div className="connections-list grid grid-cols-2 md:grid-cols-3 gap-5">
        {loading && !connections.length ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((_, index) => {
              return (
                <Skeleton
                  key={index}
                  className="min-w-[170px] w-full h-52"
                ></Skeleton>
              );
            })}
          </>
        ) : (
          <>
            {connections?.map((connection: any, index) => {
              const { user_fullname, user_picture, user_id } =
                connection as any;
              return (
                <Connections
                  key={index}
                  id={user_id}
                  isVerified={true}
                  followersCount={2000}
                  name={user_fullname}
                  content="Discover exciting new about travel and tech here"
                  img={user_picture}
                />
              );
            })}
          </>
        )}
      </div>

      <Button
        variant={"default"}
        type="submit"
        onClick={() => router.push("/gopal")}
        className="bg-primary600 flex w-full mt-12 py-6 hover:bg-primary700"
      >
        Next
      </Button>
    </>
  );
};

export default ConnectionsForm;
