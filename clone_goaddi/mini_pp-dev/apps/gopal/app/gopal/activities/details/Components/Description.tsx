import React from "react";

function Description({ description }: { description: string }) {
  return (
    <div className="container mt-3 px-3 flex flex-col">
      <h4 className="font-bold text-[2rem] ">Description</h4>
      <p className="font-satoshi text-base font-medium leading-6 tracking-wider text-left mt-4">
        {description}
      </p>
      {/* <div className="flex  pb-10 border-b sm:gap-4 gap-2 mt-4">
        <div className="bg-gray-300 rounded-sm sm:p-3 p-2">
          <h6>Guided Tours 🧭🕵️‍</h6>
        </div>
        <div className="bg-gray-300 rounded-sm sm:p-3 p-2">
          <h6>Sightseeing Cruise ⛴️</h6>
        </div>
        <div className="bg-gray-300 rounded-sm sm:p-3 p-2">
          <h6>Cultural Immersion 🌍</h6>
        </div>
      </div> */}
    </div>
  );
}

export default Description;
