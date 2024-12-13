import React from "react";
// import RightSide from "./left/sidebar";
import LeftSide from "./left/sidebar";

type Props = {};

const Container = (props: Props) => {
  return (
    <div className="sticky top-0 mt-10">
      <LeftSide />
    </div>
  );
};

export default Container;
