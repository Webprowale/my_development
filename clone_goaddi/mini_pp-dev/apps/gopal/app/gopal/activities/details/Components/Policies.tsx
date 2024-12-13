import React from "react";

type PoliciesType = {
  option: string;
  policy: string;
}[];

type PoliciesProps = {
  data: PoliciesType;
};

const Policies = React.forwardRef<HTMLDivElement, PoliciesProps>(
  ({ data }, ref) => {
    return (
      <div ref={ref} className="container flex flex-col px-3 mt-6 mb-6">
        <h4 className="font-bold text-[1.7rem] mb-4">Policies</h4>
        <h6 className="text-[1rem] font-bold font-serif mb-3">
          Cancellation Policy
        </h6>
        <p className="font-Satoshi">
          We understand that plans can change. However, due to the limited
          availability of space on our express cruises, cancellations are
          subject to the following fees
        </p>
        <div className="my-5">
          {data?.map((value, index) => (
            <div key={index}>
              <li>{value?.option}</li>
              <p>{value?.policy}</p>
            </div>
          ))}
        </div>
        {/* <h6 className="text-[1rem] font-bold font-Satoshi mb-3">Please Note</h6>
        <div className="my-3">
          <li className="font-Satoshi">
            Any changes made less than 48 hours before the experience’s start
            time will not be accepted.
          </li>
          <li className="font-Satoshi">
            Cut-off times are based on the experience’s local time.
          </li>
          <li className="font-Satoshi">
            This experience requires good weather. If it’s canceled due to poor
            weather, you’ll be offered a different date or a full refund
          </li>
        </div> */}
      </div>
    );
  },
);

export default Policies;
