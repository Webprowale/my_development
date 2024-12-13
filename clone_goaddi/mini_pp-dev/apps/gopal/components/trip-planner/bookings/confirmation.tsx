import { ArrowRight, CalendarBlank, Chair } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import React from "react";
import GoButton from "@/components/goui/button";

type FlightsProps = {
  className?: string;
  bookingId: string;
  PNR: string;
  ETicketNum: string;
  price: string;
  departure: string;
  depart: string;
  departTime: string;
  departDate: string;
  departDuration: string;
  departAirline: string;
  layover: string;
  layoverTime: string;
  layoverDate: string;
  layoverDuration: string;
  layoverAirline: string;
  finalDestination: string;
};

type HotelsProps = {
  className?: string;
  bookingId: string;
  price: string;
  paymentRef: string;
  hotelName: string;
  hotelAddress: string;
  checkIn: string;
  checkOut: string;
  room: string;
  nights: string;
  roomType: string;
};

export const Flights = ({
  bookingId,
  PNR,
  ETicketNum,
  price,
  departure,
  depart,
  departTime,
  departDate,
  departDuration,
  departAirline,
  layover,
  layoverTime,
  layoverDate,
  layoverDuration,
  layoverAirline,
  finalDestination,
  className,
}: FlightsProps) => {
  return (
    <div
      className={cn(
        "h-full max-w-[630px] overflow-hidden mx-auto w-full",
        className,
      )}
    >
      <div className="h-full w-full bg-[#F9FAFB] relative border border-primary600 pt-4 pb-6">
        <div className="rounded-full absolute top-14 h-16 w-16 bg-white -right-10 z-10 border border-primary600"></div>
        <hr className="border-t border-dashed border-spacing-1 border-primary600 w-full absolute top-[87px]" />
        <div className="rounded-full absolute top-14 h-16 w-16 bg-white -left-10 border border-primary600"></div>
        <div className="flex items-center justify-between gap-3 px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">Booking ID</div>
                <div className="text-sm font-semibold">{bookingId}</div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">PNR</div>
                <div className="text-sm font-semibold">{PNR}</div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">E-Ticket Number</div>
                <div className="text-sm font-semibold">{ETicketNum}</div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">Price</div>
                <div className="text-sm font-semibold">{price}</div>
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex flex-col gap-1">
              <div className="text-xs text-gray-500">Departure Flight</div>
              <div className="text-sm font-semibold">{departure}</div>
            </div>
          </div>
        </div>
        <div className="mt-14 px-6">
          <div className="flex items-center gap-3 mt-3">
            <div className="flex justify-center items-center gap-2 text-black text-xs h-6 px-2 rounded-sm bg-gray-200/70">
              <span>Depart</span>
              <ArrowRight className="text-black" />
            </div>

            <div className="flex items-center text-black text-[14px] font-medium">
              <p className="">{depart}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">Date</div>
                <div className="text-sm font-semibold">{departDate}</div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">Time</div>
                <div className="text-sm font-semibold">{departTime}</div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">Duration</div>
                <div className="text-sm font-semibold">{departDuration}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-sm px-3 py-2">
              <img
                src="/assets/payment-options/american-airlines.png"
                alt=""
                className="w-5 h-full "
              />
              <div className="flex items-start flex-col text-xs">
                <div className="font-medium">{departAirline}</div>
                <div className="flex items-center gap-2">
                  <p className="text-gray-600">AA-829 Boeing 787</p>
                  <div className="text-primary100 text-[10px] w-fit font-normal py-1 px-2 bg-primary900 rounded-sm">
                    First Class
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center gap-1 justify-center w-full bg-secondary100 py-2 mb-6 mt-8">
            <Chair size={18} className="text-secondary900" weight="fill" />
            <div className="text-[13px] text-secondary900">
              Layover <span className="font-semibold">Lome (LFW)</span>
            </div>
            <div className="text-secondary100 text-[10px] font-normal py-1 px-2 bg-secondary900 rounded-sm">
              2hr 10 min
            </div>
          </div>
        </div>

        <div className="px-6 my-2">
          <div className="flex items-center gap-3 mt-3">
            <div className="inline-flex items-center gap-2 text-black text-xs py-1 px-2 rounded-sm bg-gray-200/70">
              Layover
              <ArrowRight className="text-black" />
            </div>

            <div className="flex items-center text-black text-[14px] font-medium">
              <p className="">{layover}</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center gap-3">
              <div className="flex items-start">
                <div className="flex flex-col gap-1">
                  <div className="text-xs text-gray-500">Date</div>
                  <div className="text-sm font-semibold">{layoverDate}</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex flex-col gap-1">
                  <div className="text-xs text-gray-500">Time</div>
                  <div className="text-sm font-semibold">{layoverTime}</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex flex-col gap-1">
                  <div className="text-xs text-gray-500">Duration</div>
                  <div className="text-sm font-semibold">{layoverDuration}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 border border-gray-300 rounded-sm px-3 py-2">
                <img
                  src="/assets/payment-options/american-airlines.png"
                  alt=""
                  className="w-5 h-full "
                />
                <div className="flex items-start flex-col text-xs">
                  <div className="font-medium">{layoverAirline}</div>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-600">AA-829 Boeing 787</p>
                    <div className="text-primary100 text-[10px] w-fit font-normal py-1 px-2 bg-primary900 rounded-sm">
                      First Class
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6">
            <div className="inline-flex items-center gap-2 text-black text-xs py-1 px-2 rounded-sm bg-gray-200/70">
              Final Destination
              <ArrowRight className="text-black" />
            </div>

            <div className="flex items-center text-black text-[14px] font-medium">
              <p className="">{finalDestination}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Hotels = ({
  bookingId,
  paymentRef,
  price,
  hotelAddress,
  hotelName,
  checkIn,
  checkOut,
  room,
  roomType,
  nights,
  className,
}: HotelsProps) => {
  return (
    <div
      className={cn(
        "h-full max-w-[630px] overflow-hidden mx-auto w-full",
        className,
      )}
    >
      <div className="h-full w-full bg-[#F9FAFB] relative border border-primary600 pt-4 pb-6">
        <div className="rounded-full absolute top-14 h-16 w-16 bg-white -right-10 z-10 border border-primary600"></div>
        <hr className="border-t border-dashed border-spacing-1 border-primary600 w-full absolute top-[87px]" />
        <div className="rounded-full absolute top-14 h-16 w-16 bg-white -left-10 border border-primary600"></div>
        <div className="flex items-center justify-start gap-3 px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">Booking ID</div>
                <div className="text-sm font-semibold">{bookingId}</div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">Payment Reference</div>
                <div className="text-sm font-semibold">{paymentRef}</div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">Price</div>
                <div className="text-sm font-semibold">{price}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-14 px-6">
          <div className="max-w-[360px]">
            <div className="font-bold text-lg">{hotelName}</div>
            <div className="font-medium text-sm text-gray-800">
              {hotelAddress}
            </div>

            <div className="flex items-center gap-3 flex-wrap text-[13px] mt-4">
              <div className="inline-flex gap-1 items-center">
                <CalendarBlank
                  weight="bold"
                  size={16}
                  className="text-slate-600"
                />{" "}
                <span className="text-slate-600">Check In: {checkIn}</span>
              </div>
              <div className="inline-flex gap-1 items-center">
                <CalendarBlank
                  weight="bold"
                  size={16}
                  className="text-slate-600"
                />{" "}
                <span className="text-slate-600">Check In: {checkOut}</span>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

type ActivitiesConfirmationCardType ={
  className?:string;
  bookingId:string;
  PNR:string;
  price:string;
  departure:string;
}
export const ActivitiesConfirmationCard =({className='',bookingId,PNR,price,departure}:ActivitiesConfirmationCardType)=>{

  return (
    <div
      className={cn(
        "h-full max-w-[630px] overflow-hidden mx-auto w-full",
        className,
      )}
    >
      <div className="h-full w-full bg-[#F9FAFB] relative border border-primary600 pt-4 pb-6">
        <div className="rounded-full absolute top-14 h-16 w-16 bg-white -right-10 z-10 border border-primary600"></div>
        <hr className="border-t border-dashed border-spacing-1 border-primary600 w-full absolute top-[87px]" />
        <div className="rounded-full absolute top-14 h-16 w-16 bg-white -left-10 border border-primary600"></div>
        <div className="flex items-center justify-between gap-3 px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">Booking ID</div>
                <div className="text-sm font-semibold">{bookingId}</div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">PNR</div>
                <div className="text-sm font-semibold">{PNR}</div>
              </div>
            </div>
            {/* <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">E-Ticket Number</div>
                <div className="text-sm font-semibold">{ETicketNum}</div>
              </div>
            </div> */}
            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">Price</div>
                <div className="text-sm font-semibold">{price}</div>
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex flex-col gap-1">
              <div className="text-xs text-gray-500">Departure Flight</div>
              <div className="text-sm font-semibold">{departure}</div>
            </div>
          </div>
        </div>
        <div className="mt-14 px-6  flex items-center justify-between">
            <div>
              <h2 className="font-[700] text-[1.25rem] ">The Museum of Modern Art</h2>
              <p>New Your City, USA</p>
              <GoButton type="button"  className="bg-[#0A369D] mt-[1.25rem]">
              Day 1-(2)
              </GoButton>
            </div>

            <div className="">
              <p className="text-[#1D2433] font-[500] text-[1rem] mb-[1rem]">Duration: 3hours</p>
              <div className="">
                <p className="text-[#676E7E]">Date and Time</p>
                <p className="font-[700] text-[1.125rem] text-[black]">10:30 Am and Mar 19</p>
              </div>
            </div>

          <div>
            
          </div>
        </div>
        {/* <div className="mt-6 px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">Date</div>
                <div className="text-sm font-semibold">{departDate}</div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">Time</div>
                <div className="text-sm font-semibold">{departTime}</div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">Duration</div>
                <div className="text-sm font-semibold">{departDuration}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-sm px-3 py-2">
              <img
                src="/assets/payment-options/american-airlines.png"
                alt=""
                className="w-5 h-full "
              />
              <div className="flex items-start flex-col text-xs">
                <div className="font-medium">{departAirline}</div>
                <div className="flex items-center gap-2">
                  <p className="text-gray-600">AA-829 Boeing 787</p>
                  <div className="text-primary100 text-[10px] w-fit font-normal py-1 px-2 bg-primary900 rounded-sm">
                    First Class
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center gap-1 justify-center w-full bg-secondary100 py-2 mb-6 mt-8">
            <Chair size={18} className="text-secondary900" weight="fill" />
            <div className="text-[13px] text-secondary900">
              Layover <span className="font-semibold">Lome (LFW)</span>
            </div>
            <div className="text-secondary100 text-[10px] font-normal py-1 px-2 bg-secondary900 rounded-sm">
              2hr 10 min
            </div>
          </div>
        </div>

        <div className="px-6 my-2">
          <div className="flex items-center gap-3 mt-3">
            <div className="inline-flex items-center gap-2 text-black text-xs py-1 px-2 rounded-sm bg-gray-200/70">
              Layover
              <ArrowRight className="text-black" />
            </div>

            <div className="flex items-center text-black text-[14px] font-medium">
              <p className="">{layover}</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center gap-3">
              <div className="flex items-start">
                <div className="flex flex-col gap-1">
                  <div className="text-xs text-gray-500">Date</div>
                  <div className="text-sm font-semibold">{layoverDate}</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex flex-col gap-1">
                  <div className="text-xs text-gray-500">Time</div>
                  <div className="text-sm font-semibold">{layoverTime}</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex flex-col gap-1">
                  <div className="text-xs text-gray-500">Duration</div>
                  <div className="text-sm font-semibold">{layoverDuration}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 border border-gray-300 rounded-sm px-3 py-2">
                <img
                  src="/assets/payment-options/american-airlines.png"
                  alt=""
                  className="w-5 h-full "
                />
                <div className="flex items-start flex-col text-xs">
                  <div className="font-medium">{layoverAirline}</div>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-600">AA-829 Boeing 787</p>
                    <div className="text-primary100 text-[10px] w-fit font-normal py-1 px-2 bg-primary900 rounded-sm">
                      First Class
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6">
            <div className="inline-flex items-center gap-2 text-black text-xs py-1 px-2 rounded-sm bg-gray-200/70">
              Final Destination
              <ArrowRight className="text-black" />
            </div>

            <div className="flex items-center text-black text-[14px] font-medium">
              <p className="">{finalDestination}</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}




export const VacationPacageCardForConfirmation =({className='',bookingId,PNR,price,departure}:ActivitiesConfirmationCardType)=>{

  return (
    <div
      className={cn(
        "h-full max-w-[630px] overflow-hidden mx-auto w-full",
        className,
      )}
    >
      <div className="h-full w-full bg-[#F9FAFB] relative border border-primary600 pt-4 pb-6">
        <div className="rounded-full absolute top-14 h-16 w-16 bg-white -right-10 z-10 border border-primary600"></div>
        <hr className="border-t border-dashed border-spacing-1 border-primary600 w-full absolute top-[87px]" />
        <div className="rounded-full absolute top-14 h-16 w-16 bg-white -left-10 border border-primary600"></div>
        <div className="flex items-center justify-between gap-3 px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">Booking ID</div>
                <div className="text-sm font-semibold">{bookingId}</div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">PNR</div>
                <div className="text-sm font-semibold">{PNR}</div>
              </div>
            </div>
            {/* <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">E-Ticket Number</div>
                <div className="text-sm font-semibold">{ETicketNum}</div>
              </div>
            </div> */}
            <div className="flex items-start">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-500">Price</div>
                <div className="text-sm font-semibold">{price}</div>
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex flex-col gap-1">
              <div className="text-xs text-gray-500">Departure Flight</div>
              <div className="text-sm font-semibold">{departure}</div>
            </div>
          </div>
        </div>
        <div className="mt-14 px-6  flex items-center justify-between">
            <div>
              <h2 className="font-[700] text-[1.25rem] ">A Taste of Thailand</h2>
              <p>Banglok, Thailand</p>
              
<div className="flex items-center gap-3 flex-wrap text-sm mt-[1.25rem]">
<div className="inline-flex gap-2 items-center">
  <CalendarBlank
    weight="bold"
    size={18}
    className="text-gray-600"
  />{" "}
  <span className="text-gray-600">From: 20-04-2024</span>
</div>
<div className="inline-flex gap-2 items-center">
  <CalendarBlank
    weight="bold"
    size={18}
    className="text-gray-600"
  />{" "}
  <span className="text-gray-600">To: 29-04-2024</span>
</div>
</div> 
            </div>

            <div className="">
              <p className="text-[#1D2433] font-[500] text-[1rem] mb-[1rem]">Duration: 3hours</p>
              <div className="">
                <p className="text-[#676E7E] text-[0.875rem]">Traveller</p>
                <p className="font-[700] text-[1rem] text-[black] ">2 Adults, 1 child</p>
              </div>
            </div>

          <div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
