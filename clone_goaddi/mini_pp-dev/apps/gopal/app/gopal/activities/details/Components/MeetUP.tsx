import { MapPin } from "@phosphor-icons/react";
import React from "react";
import { CiLocationOn } from "react-icons/ci";

const MeetUP = React.forwardRef(({meetUpPoint}:{meetUpPoint: string}) => (
    <div className="container flex flex-col px-3 pb-6 border-b sm:mb-6">
      <h4 className="font-bold text-[1.7rem] mb-4">Meeting Up</h4>
      <h6 className="text-[1rem] font-bold font-serif mb-3">Meet Here</h6>
      <div className="flex">
        <div className="flex" style={{ width: "45px" }}>
          {/* <CiLocationOn className="text-purple-500 text-[45px]" /> */}
          <MapPin size={48} weight="fill" color="#9747FF"/>
        </div>
        <div className="flex-grow">
          <h6 className="font-satoshi text-base font-medium leading-6 tracking-tighter text-left">
           {meetUpPoint}
          </h6>
          {/* <p className="font-Satoshi text-base font-medium text-gray-500 mb-4">
            Board directly at Pier 16, South Street Seaport, Look for our blue
            "Circle Line" ticket booth at the entrance to Pier 16. Please arrive
            at Pier 16 at least 15 minutes before your scheduled departure time
          </p> */}
          <a href={`https://www.google.com/maps/place/${meetUpPoint}`} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold underline underline-offset-4 font-serif text-blue-500">Open in google map</a>
        <p className="mt-4 -ml-4 text-xl font-bold font-serif">
          End Here
        </p>
        <p className="font-Satoshi text-base font-medium">This activity ends back at the meeting point.</p>
        </div>
      </div>
    </div>
));

export default MeetUP;
