import React from "react";
import Recommendations from "./recommendations";
import Trending from "./trending";
import MyTripSlider from "@/components/trip-timeline/MyTripSlider";

type Props = {
  isUser: boolean;
};

const RightSide = ({ isUser }: Props) => {
  return (
    <div className="xl:flex min-w-0 w-full hidden sticky top-28 right-0  flex-col gap-4 mb-10">
      {/* <MyTripSlider /> */}
      {isUser ? <Recommendations /> : null}
      <Trending />
    </div>
  );
};

export default RightSide;
