"use client";
import {
  AirplaneInFlight,
  Buildings,
  CheckCircle,
  RoadHorizon,
} from "@phosphor-icons/react";
import React from "react";
import { naira } from "@/utils/money";


type Props = {};


const PriceDetails = (props: Props) => {
  return (
    <div className="w-full overflow-y-scroll px-2 mt-4">
      <div className="rounded-sm max-w-[350px] bg-warning100 text-warning900 p-2">
        <div className="flex justify-between items-center font-semibold">
          <div className="flex gap-2 items-center  text-warning900">
            <CheckCircle size={16} weight="fill" className="text-warning900" />
            <div className="text-sm">Heads up!</div>
          </div>
          <div className="text-sm">10:00:00</div>
        </div>
        <p className="text-xs py-1">
          Hotel, flight, and activity prices can sometimes change. Continue
          booking to secure your selections at the current rates, or review your
          options before confirming
        </p>
      </div>
      <div className="">
        <svg
          width="350"
          height="105"
          viewBox="0 0 496 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_5770_27744)">
            <path
              d="M131.23 1086.82C131.23 1081.85 135.472 1077.81 140.71 1077.81C145.948 1077.81 150.19 1081.85 150.19 1086.82C150.19 1086.88 150.18 1086.94 150.18 1087H163.973C163.973 1086.94 163.963 1086.88 163.963 1086.82C163.963 1081.75 168.075 1077.63 173.148 1077.63C176.799 1077.63 179.946 1079.77 181.427 1082.86C181.422 1082.49 181.407 1082.12 181.407 1081.75C181.407 1044.97 211.223 1015.15 248.003 1015.15C284.782 1015.15 314.598 1044.97 314.598 1081.75C314.598 1083.52 314.528 1085.27 314.393 1087H315.168C315.168 1086.94 315.158 1086.88 315.158 1086.82C315.158 1081.85 319.401 1077.81 324.638 1077.81C329.876 1077.81 334.119 1081.85 334.119 1086.82C334.119 1086.88 334.109 1086.94 334.109 1087H345.82C345.82 1086.94 345.81 1086.88 345.81 1086.82C345.81 1081.85 350.057 1077.81 355.29 1077.81C360.523 1077.81 364.77 1081.85 364.77 1086.82C364.77 1086.88 364.76 1086.94 364.76 1087H376.471C376.471 1086.94 376.461 1086.88 376.461 1086.82C376.461 1081.85 380.708 1077.81 385.941 1077.81C391.174 1077.81 395.421 1081.85 395.421 1086.82C395.421 1086.88 395.411 1086.94 395.411 1087H407.123C407.123 1086.94 407.113 1086.88 407.113 1086.82C407.113 1081.85 411.355 1077.81 416.593 1077.81C421.83 1077.81 426.073 1081.85 426.073 1086.82C426.073 1086.88 426.063 1086.94 426.063 1087H437.774C437.774 1086.94 437.764 1086.88 437.764 1086.82C437.764 1081.85 442.006 1077.81 447.244 1077.81C452.482 1077.81 456.724 1081.85 456.724 1086.82C456.724 1086.88 456.714 1086.94 456.714 1087H468.425C468.425 1086.94 468.415 1086.88 468.415 1086.82C468.415 1081.85 472.663 1077.81 477.895 1077.81C483.128 1077.81 487.375 1081.85 487.375 1086.82C487.375 1086.88 487.365 1086.94 487.365 1087H496L496 0L487.345 0C487.045 4.71771 482.933 8.45486 477.895 8.45486C472.858 8.45486 468.74 4.71271 468.445 0L456.694 0C456.394 4.71771 452.282 8.45486 447.244 8.45486C442.206 8.45486 438.094 4.71271 437.794 0L426.043 0C425.742 4.71771 421.63 8.45486 416.593 8.45486C411.555 8.45486 407.443 4.71271 407.143 0L395.391 0C395.091 4.71771 390.979 8.45486 385.941 8.45486C380.904 8.45486 376.791 4.71271 376.491 0L364.74 0C364.44 4.71771 360.328 8.45486 355.29 8.45486C350.252 8.45486 346.14 4.71271 345.84 0L334.089 0C333.788 4.71771 329.676 8.45486 324.638 8.45486C319.601 8.45486 315.489 4.71271 315.188 0L314.393 0C314.528 1.731 314.598 3.482 314.598 5.24802C314.598 42.0292 284.782 71.8463 248.003 71.8463C211.223 71.8463 181.407 42.0292 181.407 5.24802C181.407 4.62266 181.427 4.0023 181.442 3.38194C179.966 6.48873 176.814 8.63997 173.148 8.63997C168.26 8.63997 164.273 4.81777 163.988 0L150.16 0C149.86 4.71771 145.748 8.45486 140.71 8.45486C135.672 8.45486 131.56 4.71271 131.26 0L119.509 0C119.209 4.71771 115.097 8.45486 110.059 8.45486C105.021 8.45486 100.909 4.71271 100.609 0L88.8575 0C88.5573 4.71771 84.4451 8.45486 79.4074 8.45486C74.3698 8.45486 70.2575 4.71271 69.9574 0L58.2061 0C57.9059 4.71771 53.7937 8.45486 48.756 8.45486C43.7184 8.45486 39.6062 4.71271 39.306 0L27.5547 0C27.2546 4.71771 23.1474 8.45486 18.1047 8.45486C13.062 8.45486 8.95477 4.71271 8.6546 0L3.05176e-05 0L3.05176e-05 1087H8.63458C8.63458 1086.94 8.62463 1086.88 8.62463 1086.82C8.62463 1081.85 12.8719 1077.81 18.1047 1077.81C23.3375 1077.81 27.5847 1081.85 27.5847 1086.82C27.5847 1086.88 27.5748 1086.94 27.5748 1087H39.286C39.286 1086.94 39.2759 1086.88 39.2759 1086.82C39.2759 1081.85 43.5233 1077.81 48.756 1077.81C53.9889 1077.81 58.2361 1081.85 58.2361 1086.82C58.2361 1086.88 58.2261 1086.94 58.2261 1087H69.9373C69.9373 1086.94 69.9273 1086.88 69.9273 1086.82C69.9273 1081.85 74.1696 1077.81 79.4074 1077.81C84.6452 1077.81 88.8875 1081.85 88.8875 1086.82C88.8875 1086.88 88.8775 1086.94 88.8775 1087H100.589C100.589 1086.94 100.579 1086.88 100.579 1086.82C100.579 1081.85 104.826 1077.81 110.059 1077.81C115.292 1077.81 119.539 1081.85 119.539 1086.82C119.539 1086.88 119.529 1086.94 119.529 1087H131.24C131.24 1086.94 131.23 1086.88 131.23 1086.82Z"
              fill="#257CFD"
            />
          </g>
          <defs>
            <clipPath id="clip0_5770_27744">
              <rect
                width="105"
                height="496"
                fill="white"
                transform="matrix(0 1 -1 0 496 0)"
              />
            </clipPath>
          </defs>
        </svg>
        <div className="relative bg-primary500 w-[350px] text-white">
          <div className="py-3 px-3 text-center text-white bg-primary700 rounded-lg mx-5">
            Price Details
          </div>


          <div className="bg-primary700 py-4 px-4 mx-5 mt-6 rounded-lg">
            {/* Hotels */}
            <div className="">
              <div className="inline-flex gap-1 items-center ">
                <Buildings weight="fill" size={20} className="text-white" />
                <div className="text-sm text-white">Hotels</div>
              </div>
              {/* Hotels Details */}
              <div className="">
                <ul className="flex flex-col gap-5 mt-3">
                  {HOTELS_DETAILS.map((flight, index) => {
                    const { discount, tax, nights, room, price } = flight;
                    return (
                      <li
                        key={index}
                        className="flex flex-col gap-y-2 justify-between font-light"
                      >
                        <div className="flex justify-between">
                          <div className="text-[13px] text-gray-100">
                            {room} Room ({" "}
                            <span className="font-medium text-white">
                              {nights} nights
                            </span>
                            )
                          </div>


                          <div className="text-[13px]">{naira(price)}</div>
                        </div>
                        <div className="flex justify-between">
                          <div className="text-[13px] text-gray-100">
                            Taxes and Fees
                          </div>


                          <div className="text-[13px] text-white">
                            {naira(tax)}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="text-[13px] text-gray-100">
                            Discount
                          </div>


                          <div className="text-[13px] text-white">
                            {naira(discount)}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="my-5">
                  <hr className="border-t border-dashed border-gray-100 h-1" />
                </div>
              </div>
            </div>

          </div>
          <div className="pb-3">
            <div className="bg-primary700 rounded-lg p-5 text-white mx-5 mt-6">
              <div className="text-sm">Total Price</div>
              <div className="text-2xl font-medium">{naira(1123450)}</div>
            </div>
          </div>
        </div>
        <svg
          width="350"
          height="100"
          viewBox="0 0 496 45"
          fill="none"
          className="rotate-180"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_5770_27744)">
            <path
              d="M131.23 1086.82C131.23 1081.85 135.472 1077.81 140.71 1077.81C145.948 1077.81 150.19 1081.85 150.19 1086.82C150.19 1086.88 150.18 1086.94 150.18 1087H163.973C163.973 1086.94 163.963 1086.88 163.963 1086.82C163.963 1081.75 168.075 1077.63 173.148 1077.63C176.799 1077.63 179.946 1079.77 181.427 1082.86C181.422 1082.49 181.407 1082.12 181.407 1081.75C181.407 1044.97 211.223 1015.15 248.003 1015.15C284.782 1015.15 314.598 1044.97 314.598 1081.75C314.598 1083.52 314.528 1085.27 314.393 1087H315.168C315.168 1086.94 315.158 1086.88 315.158 1086.82C315.158 1081.85 319.401 1077.81 324.638 1077.81C329.876 1077.81 334.119 1081.85 334.119 1086.82C334.119 1086.88 334.109 1086.94 334.109 1087H345.82C345.82 1086.94 345.81 1086.88 345.81 1086.82C345.81 1081.85 350.057 1077.81 355.29 1077.81C360.523 1077.81 364.77 1081.85 364.77 1086.82C364.77 1086.88 364.76 1086.94 364.76 1087H376.471C376.471 1086.94 376.461 1086.88 376.461 1086.82C376.461 1081.85 380.708 1077.81 385.941 1077.81C391.174 1077.81 395.421 1081.85 395.421 1086.82C395.421 1086.88 395.411 1086.94 395.411 1087H407.123C407.123 1086.94 407.113 1086.88 407.113 1086.82C407.113 1081.85 411.355 1077.81 416.593 1077.81C421.83 1077.81 426.073 1081.85 426.073 1086.82C426.073 1086.88 426.063 1086.94 426.063 1087H437.774C437.774 1086.94 437.764 1086.88 437.764 1086.82C437.764 1081.85 442.006 1077.81 447.244 1077.81C452.482 1077.81 456.724 1081.85 456.724 1086.82C456.724 1086.88 456.714 1086.94 456.714 1087H468.425C468.425 1086.94 468.415 1086.88 468.415 1086.82C468.415 1081.85 472.663 1077.81 477.895 1077.81C483.128 1077.81 487.375 1081.85 487.375 1086.82C487.375 1086.88 487.365 1086.94 487.365 1087H496L496 0L487.345 0C487.045 4.71771 482.933 8.45486 477.895 8.45486C472.858 8.45486 468.74 4.71271 468.445 0L456.694 0C456.394 4.71771 452.282 8.45486 447.244 8.45486C442.206 8.45486 438.094 4.71271 437.794 0L426.043 0C425.742 4.71771 421.63 8.45486 416.593 8.45486C411.555 8.45486 407.443 4.71271 407.143 0L395.391 0C395.091 4.71771 390.979 8.45486 385.941 8.45486C380.904 8.45486 376.791 4.71271 376.491 0L364.74 0C364.44 4.71771 360.328 8.45486 355.29 8.45486C350.252 8.45486 346.14 4.71271 345.84 0L334.089 0C333.788 4.71771 329.676 8.45486 324.638 8.45486C319.601 8.45486 315.489 4.71271 315.188 0L314.393 0C314.528 1.731 314.598 3.482 314.598 5.24802C314.598 42.0292 284.782 71.8463 248.003 71.8463C211.223 71.8463 181.407 42.0292 181.407 5.24802C181.407 4.62266 181.427 4.0023 181.442 3.38194C179.966 6.48873 176.814 8.63997 173.148 8.63997C168.26 8.63997 164.273 4.81777 163.988 0L150.16 0C149.86 4.71771 145.748 8.45486 140.71 8.45486C135.672 8.45486 131.56 4.71271 131.26 0L119.509 0C119.209 4.71771 115.097 8.45486 110.059 8.45486C105.021 8.45486 100.909 4.71271 100.609 0L88.8575 0C88.5573 4.71771 84.4451 8.45486 79.4074 8.45486C74.3698 8.45486 70.2575 4.71271 69.9574 0L58.2061 0C57.9059 4.71771 53.7937 8.45486 48.756 8.45486C43.7184 8.45486 39.6062 4.71271 39.306 0L27.5547 0C27.2546 4.71771 23.1474 8.45486 18.1047 8.45486C13.062 8.45486 8.95477 4.71271 8.6546 0L3.05176e-05 0L3.05176e-05 1087H8.63458C8.63458 1086.94 8.62463 1086.88 8.62463 1086.82C8.62463 1081.85 12.8719 1077.81 18.1047 1077.81C23.3375 1077.81 27.5847 1081.85 27.5847 1086.82C27.5847 1086.88 27.5748 1086.94 27.5748 1087H39.286C39.286 1086.94 39.2759 1086.88 39.2759 1086.82C39.2759 1081.85 43.5233 1077.81 48.756 1077.81C53.9889 1077.81 58.2361 1081.85 58.2361 1086.82C58.2361 1086.88 58.2261 1086.94 58.2261 1087H69.9373C69.9373 1086.94 69.9273 1086.88 69.9273 1086.82C69.9273 1081.85 74.1696 1077.81 79.4074 1077.81C84.6452 1077.81 88.8875 1081.85 88.8875 1086.82C88.8875 1086.88 88.8775 1086.94 88.8775 1087H100.589C100.589 1086.94 100.579 1086.88 100.579 1086.82C100.579 1081.85 104.826 1077.81 110.059 1077.81C115.292 1077.81 119.539 1081.85 119.539 1086.82C119.539 1086.88 119.529 1086.94 119.529 1087H131.24C131.24 1086.94 131.23 1086.88 131.23 1086.82Z"
              fill="#257CFD"
            />
          </g>
          <defs>
            <clipPath id="clip0_5770_27744">
              <rect
                width="105"
                height="496"
                fill="white"
                transform="matrix(0 1 -1 0 496 0)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};


export default PriceDetails;


const FLIGHTS_DETAILS = [
  {
    traveller: "1 Adult",
    ticket: "1123450",
    tax: "23450",
    discount: "0",
  },
  {
    traveller: "1 Child",
    ticket: "1123450",
    tax: "23450",
    discount: "0",
  },
  {
    traveller: "1 Infant",
    ticket: "1123450",
    tax: "23450",
    discount: "0",
  },
];


const HOTELS_DETAILS = [
  {
    nights: "5",
    room: "1",
    price: "1123450",
    tax: "23450",
    discount: "0",
  },
];
const ACTIVITIES_DETAILS = [
  {
    traveller: "1 Adult",
    ticket: "1123450",
    tax: "23450",
    discount: "0",
  },
  {
    traveller: "1 Child",
    ticket: "1123450",
    tax: "23450",
    discount: "0",
  },
  {
    traveller: "1 Infant",
    ticket: "1123450",
    tax: "23450",
    discount: "0",
  },
];



