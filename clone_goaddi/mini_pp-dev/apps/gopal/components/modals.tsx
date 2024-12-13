import React from "react";
import ViewPost from "./posts/view-post";
// import CreateModal from "./create/create-post";
import { redirect } from "next/navigation";
import getUser from "@/lib/get-user";

type Props = {};

const Modals = async () => {
  const userId = await getUser();
  // console.log("User Id", userId);

  return (
    <>
      <ViewPost userId={userId} />
      {/* <CreateModal /> */}
      
    </>
  );
};

export default Modals;
