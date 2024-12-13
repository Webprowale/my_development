"use client";
import GoButton from "@/components/goui/button";
import FAQs from "../../components/faqsHotels";
import GridFlightViewCard from "../../components/GridFlightViewCard";
import ReviewsComponent from "../../components/Reviews";
import SelectedRooms from "../../components/SelectedRooms";
import HotelsHeader from "./components/hotelsHeader";
import NavTab, { ScrollToNavBarDetail } from "./components/NavTab";
import {
  Bed,
  Trash,
  Users,
  Question,
  CalendarBlank,
  XCircle,
  Clock,
  PawPrint,
  CarSimple,
  WifiHigh,
  BowlFood,
  User,
  Hoodie,
  Martini,
  Broom,
  Alarm,
  Wind,
} from "@phosphor-icons/react";
import { useSearchParams } from "next/navigation";
import { useHotelStore } from "@/store/useHotelStore";
import { useEffect } from "react";

const Line = ({className}:{className?:string}) => <div className={`bg-[#D0D5DD] h-[1px] w-[100%] ${className}`}></div>;

type ITextWithIcon = {
  text: string;
  icon: any;
};
const TextWithIcon = ({ text, icon }: ITextWithIcon) => (
  <div className="text-[#1D2433] font-[500] flex items-center gap-[0.375rem]">
    {icon}
    <p className=" text-[1rem] text-nowrap">{text}</p>
  </div>
);

const HotelDetail = () => {
  const { hotelList, loading, fetchHotelDetails, hotelDetail } =
    useHotelStore();

  const tabs = [
    "Description",
    "Hotel Information",
    "Facilities",
    "Rooms",
    "Reviews",
    "FAQs",
  ];

  const params: any = useSearchParams();

  // URL parameters
  let searchId = params.get("sid");
  let sessionId = params.get("sessionId");
  let rooms = params.get("rooms");
  let nights = params.get("nights");
  let tokenId = params.get("token");
  let productId = params.get("pid");
  let hotelId = params.get("hid");

  // console.log(sessionId, searchId, rooms, nights, tokenId, productId, hotelId);

  useEffect(() => {
    fetchHotelDetails({
      searchId,
      sessionId,
      rooms,
      nights,
      tokenId,
      productId,
      hotelId,
    });
  }, [hotelId]);

  return (
    <div
      // style={{'border':"1px solid red"}}
      className="p-[1rem] bg-[#FFFFFF] relative"
    >
      <div className="sticky top-20 z-[100] bg-[#FFFFFF]">
        <HotelsHeader
          name={hotelDetail?.hotelName}
          location={hotelDetail?.location}
          rating={hotelDetail?.rating}
        />
        <div className="pb-[2rem]"></div>
        <div className="">
          <NavTab
            tabs={tabs}
            defaultTab={tabs[0]}
            onChange={(value) => {
              ScrollToNavBarDetail({ value, offset: 300 });
            }}
          />
        </div>
      </div>
      <div
        // className="border border-red-600"
      >
        <div className="md:flex md:flex-col items-start gap-[0.875rem] w-full mt-[1.875rem]">
          {/*description tab  */}
          {/* <div className="md:w-[60%]">
   
          
          </div> */}
          {/* <Line  className="mt-[0.938rem]"/> */}


          <div className=""
          //  style={{'border':'1px solid green'}}
          >
           
           <div 
          //  style={{'border':'11px solid yellow'}} 
           className="flex items-start w-[100%]">
            <div className=" gap-[1.25rem] w-[70%] ">
              
            <div className=""
        id={tabs[0]}
            
            >
              <h2 className="text-[#1D2433] font-[700] text-[1.25rem] pb-[1.25rem]">
                Description
              </h2>
              <p className="font-[500] text-[1rem]">
                {hotelDetail?.description}
              </p>
            </div>

              {/* hotel information */}
              <div
                className=""
                id={tabs[1]}
              >
                <h2 className="text-[#1D2433] font-[700] text-[1.25rem] pb-[1.25rem]">
                  Hotel Information
                </h2>
                <div className="flex-wrap flex-col md:grid md:grid-cols-2 md:gap-[1rem] md:gap-x-[2rem] max-w-[495px]">
                  <TextWithIcon
                    text="Smoke Free Property"
                    icon={<XCircle size={20} />}
                  />
                  <TextWithIcon
                    text="Minimum Age to Check In: 18"
                    icon={<CalendarBlank size={20} />}
                  />
                  <TextWithIcon
                    text="Air conditioning in all rooms!"
                    icon={<Wind size={20} />}
                  />
                  
                </div>
              </div>
              {/* end hotel information */}
              <Line  className="my-[2.5rem]"/>

              <div
                  className=""
                  id={tabs[2]}
                >
                  <h2 className="text-[#1D2433] font-[700] text-[1.25rem] pb-[1.25rem]">
                    Facilities
                  </h2>
                  <div className="flex flex-wrap gap-[1.25rem] ">
                    <TextWithIcon
                      text="Room service [24-hour]"
                      icon={<BowlFood size={20} />}
                    />
                    <TextWithIcon
                      text="Free Wi-Fi in all rooms!"
                      icon={<WifiHigh size={20} />}
                    />
                    <TextWithIcon
                      text="Front desk [24-hour]"
                      icon={<User size={20} />}
                    />

                    <TextWithIcon
                      text="Bathrobes"
                      icon={<Hoodie size={20} />}
                    />
                    <TextWithIcon
                      text="Bar"
                      icon={<Martini size={20} />}
                    />
                    <TextWithIcon
                      text="Free Wi-Fi in all rooms!"
                      icon={<WifiHigh size={20} />}
                    />
                    <TextWithIcon
                      text="Laundry service"
                      icon={<Martini size={20} />}
                    />
                    <TextWithIcon
                      text="Daily housekeeping"
                      icon={<Broom size={20} />}
                    />
                    <TextWithIcon
                      text="Smoke alamrms"
                      icon={<Alarm size={20} />}
                    />

                    <TextWithIcon
                      text="Air conditioning in all rooms!"
                      icon={<Wind size={20} />}
                    />
                  </div>
                </div>
                <Line  className="my-[2.5rem]"/>


                <div className="">
                  <h2
                    id={tabs[3]}
                    className="text-[#1D2433] font-[700] text-[1.25rem] pb-[1.25rem]"
                  >
                    Selected Rooms
                  </h2>

                  <div className="flex flex-col gap-[1rem] ">
                    <SelectedRooms />
                    <SelectedRooms />
                    <SelectedRooms />
                  </div>
                </div>
              {/* end description tab  */}

            
            </div>
            
              <div
                  className="w-[500px]  border-[1px] rounded-[4px] bg-[#f7f9fc]  w-[30%] "
                  // style={{'border':'1px solid red'}}
                >
                  <p className="px-[2rem] py-[1.5rem] bg-primary1000 flex items-center gap-[0.25rem]">
                    <span className="font-[500] text-[1.25rem]  text-[#FFFFFF]">
                      Total Price:{" "}
                    </span>
                    <span className="font-[700] text-[2rem] text-[#FFFFFF]">
                      ₦ 7000.00
                    </span>
                  </p>
                  <div className=" p-[1.75rem]">
                    <div className="mb-[1.938rem] flex items-center justify-between ">
                      <div>
                        <p className="font-[500] flex items-center gap-[0.375rem] text-[1rem] text-[#1D2433]">
                          <CalendarBlank size={20} />

                          <span>Mon, 6 May 24 –- Fri, 10 May 24</span>
                        </p>
                        <div className="flex items-center gap-[0.75rem] mt-[0.625rem]">
                          <p className="font-[500] flex items-center gap-[0.375rem] text-[1rem] text-[#1D2433]">
                            <Bed size={20} />
                            <span>4 rooms</span>
                          </p>
                          <p className="font-[500] flex items-center gap-[0.375rem] text-[1rem] text-[#1D2433]">
                            <Users size={20} />
                            <span>8 guest</span>
                          </p>
                        </div>
                      </div>
                      <GoButton className="bg-[#fbf1f1] text-[#645D5D] border-[none]">
                        2 Nights
                      </GoButton>
                    </div>
                    <Line  className="my-[2.5rem]"/>

                    <br />
                    {[...new Array(3)].map((d, index) => (
                      <div>
                        <br />
                        <div
                          className="flex items-start justify-between pb-[1.5rem] mb-[1.25rem]"
                          key={index}
                        >
                          <div>
                            <h2 className="text-[#1D2433] text-[1.125rem] font-[700] mb-[0.375rem]">
                              King Size Room
                            </h2>
                            <p className="text-[#1D2433] text-[1.25rem] font-[700]">
                              ₦ 1000.00
                            </p>
                            <p className="flex gap-[0.375rem] items-center text-[#676E7E] mb-[0.5rem]">
                              <Users size={20} />
                              <span>2 guests</span>
                            </p>
                          </div>
                          <GoButton className="flex items-center gap-[0.449rem] bg-[#E7F0FF] text-primary">
                            <Trash size={20} />
                            <span>Remove</span>
                          </GoButton>
                        </div>
                        {index != 2 ? <Line /> : ""}
                      </div>
                    ))}
                  </div>
                  {/* //Total of selelcted */}

                  <div className="px-[1.75rem] py-[1rem] bg-white flex flex-col itemc-center justify-center gap-[0.75rem]">
                    <GoButton className="w-full py-[0.75rem] font-[700] text-[1rem]">
                      Book Now
                    </GoButton>

                    <p className="text-primary flex items-center justify-center gap-[0.25rem] font-[700] text-[1rem]">
                      <span>Send Quotation</span>
                      <Question size={20} />
                    </p>
                  </div>
            </div>
           </div>

            <div className="">
              <h2
                id={tabs[4]}
                className="text-[#1D2433] font-[700] text-[1.25rem] pb-[1.25rem]"
              >
                Reviews
              </h2>

              <div>
                <ReviewsComponent />
              </div>
            </div>

            <div id={tabs[5]}>
              <FAQs isDetail={false} />
            </div>

            {/* <div
              className="pb-[2.5rem] pt-[1.875rem]"
              // id={tabs[1]}
            >
              <h2 className="text-[#1D2433] font-[700] text-[1.25rem] pb-[1.25rem]">
                Hotels in this location
              </h2>

              <section
                className=" gap-[1.5rem] w-[100%] flex-col flex flex-row md:gap-[1.5rem]  w-[100%]
                md:grid md:grid-cols-4 
                "
              >
                {[...new Array(4)].map((d, index) => (
                  <GridFlightViewCard key={index} />
                ))}
              </section>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
