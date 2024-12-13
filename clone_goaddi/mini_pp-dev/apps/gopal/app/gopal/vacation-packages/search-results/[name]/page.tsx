"use client";
import GoButton from "@/components/goui/button";
// import FAQs from "../../components/faqsHotels";
import GridFlightViewCard from "@/app/gopal/hotels/components/GridFlightViewCard";
// import GridFlightViewCard from "../../components/GridFlightViewCard";
import ReviewsComponent from "@/app/gopal/hotels/components/Reviews";
// import ReviewsComponent from "../../components/Reviews";
import SelectedRooms from "../../components/selectedRooms";
// import SelectedRooms from "../../components/SelectedRooms";
import VacationsHeader from "../../components/vacationHeader";
// import HotelsHeader from "./components/hotelsHeader";
import NavTab from "@/app/gopal/hotels/details/[id]/components/NavTab";
import { faqList } from "@/app/gopal/flights/components/dummy";
// import NavTab from "./components/NavTab";
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
  CheckCircle,
} from "@phosphor-icons/react";
import {
  AirplaneTilt,
  Bus,
  ForkKnife,
  Heart,
  Star,
} from "@phosphor-icons/react";
import { useState } from "react";
import { VacationPackageCard } from "@/components/vacation-packages/featured-vacation-card";
import { naira } from "@/utils/money";
import FAQs from "@/app/gopal/activities/components/faqs";
import FaqAccordion from "@/components/ui/faq-accordion";

const Line = () => <div className="bg-[#D0D5DD] h-[1px] w-[100%]"></div>;
type ITextWithIcon = {
  title: string;
  text: string;
  icon: any;
};
const TextWithIcon = ({ title, text, icon }: ITextWithIcon) => (
  <div className="flex flex-col items-start">
    <p className="font-semibold text-[15px] mb-1">{title}</p>
    <div className="text-[#1D2433] font-[500] flex items-center gap-[0.375rem]">
      {icon}
      <p className="text-[14px] text-nowrap">{text}</p>
    </div>
  </div>
);
const HotelDetail = ({
  params,
}: {
  params: {
    name: string;
  };
}) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    "Description",
    "Inclusions",
    "Exclusions",
    "Additional Prices",
    "Tour Plan",
    "Additional Info",
    "Policies",
    "Reviews",
    "FAQs",
  ];

  const iconClass = "text-2xl text-gray-500";
  return (
    <div className="bg-white  py-8 px-5">
      <VacationsHeader />

      <div className="pb-[2rem] "></div>
      <NavTab
        tabs={tabs}
        defaultTab={tabs[0]}
        onChange={(value) => {
          console.log(value);
          setActiveTab(value.toLowerCase());
        }}
      />

      <div className="md:flex items-start gap-[0.875rem] w-full mt-[1.875rem]">
        <div className="md:w-[62%]">
          {/* descriptio */}
          {activeTab === "description" ? (
            <div className="pb-[2.5rem] pt-[0.6rem]">
              <h2 className="text-[#1D2433] font-[700] text-[1.25rem] pb-[1.25rem]">
                Description
              </h2>
              <p className="font-[500] text-[16px]">
                Experience a taste of Thailand on this 5-day journey, with its
                beautiful beaches and islands, fascinating culture, exotic
                architecture, and ancient ruins. Discover some of the best
                highlights of this magnificent country, including the bustling
                capital city of Bangkok, the historic River Kwai, and the
                ancient city of Ayutthaya—all for an amazingly affordable price.
              </p>
            </div>
          ) : null}
          <Line />

          <div className="pb-[2.5rem] pt-[0.6rem]">
            <h2 className="text-[#1D2433] font-[700] text-[1.25rem] pb-[0.6rem]">
              Inclusions
            </h2>

            <div className="flex items-center gap-2.5 mb-2">
              <AirplaneTilt className={iconClass} />

              <Bus className={iconClass} />

              <Bed className={iconClass} />

              <ForkKnife className={iconClass} />
            </div>
            <div className="flex-wrap flex items-center md:grid md:grid-cols-1 md:gap-[1rem] max-w-[495px] mt-8">
              <TextWithIcon
                title="Flight"
                text="Round-trip airfare from Nigeria"
                icon={
                  <CheckCircle
                    size={17}
                    weight="fill"
                    className="text-green-700"
                  />
                }
              />
              <TextWithIcon
                title="Coach"
                text="Intra-Thailand transportation and transfers"
                icon={
                  <CheckCircle
                    size={17}
                    weight="fill"
                    className="text-green-700"
                  />
                }
              />

              <TextWithIcon
                title="Accommodation"
                text="4 nights at Superior First Class hotels"
                icon={
                  <CheckCircle
                    size={17}
                    weight="fill"
                    className="text-green-700"
                  />
                }
              />

              <TextWithIcon
                title="Feeding"
                text="5 Meals: 4 breakfasts & a welcome dinner"
                icon={
                  <CheckCircle
                    size={17}
                    weight="fill"
                    className="text-green-700"
                  />
                }
              />
            </div>
          </div>

          <Line />

          <div className="pb-[2.5rem] pt-[0.6rem]">
            <h2 className="text-[#1D2433] font-[700] text-[1.25rem] pb-[1.25rem]">
              Exclusions
            </h2>
            <div className="flex-wrap flex items-center md:grid md:grid-cols-1 md:gap-[1rem] max-w-[495px] ">
              <TextWithIcon
                title="Coach"
                text="Intra-Thailand transportation and transfers"
                icon={
                  <XCircle size={17} weight="fill" className="text-red-700" />
                }
              />

              <TextWithIcon
                title="Accommodation"
                text="4 nights at Superior First Class hotels"
                icon={
                  <XCircle size={17} weight="fill" className="text-red-700" />
                }
              />
            </div>
          </div>

          <Line />

          <div className="pb-[2.5rem] pt-[0.6rem]">
            <h2 className="text-[#1D2433] font-[700] text-[1.25rem] pb-[1.25rem]">
              Additional Prices
            </h2>

            <div className="flex flex-col gap-[1rem] ">
              <SelectedRooms
                title="Single Occupancy"
                desc="This package is priced based on double occupancy rooms or cabins. We charge solo travelers an extra fee to cover the extra costs of single occupancy rooms or cabins."
              />
              <SelectedRooms
                title="Visa Fees and Assistance"
                desc="This package does not cover your visa fees but we can definitely help you with that."
              />
            </div>
          </div>
        </div>

        <div className="max-w-[550px] md:md:w-[38%] border-[1px] rounded-[4px] ">
          <p className="px-[2rem] py-[1.2rem] bg-primary1000 flex items-center gap-[0.25rem]">
            <span className="font-[500] text-[1.05rem]  text-[#FFFFFF]">
              Total Price:{" "}
            </span>
            <span className="font-[700] text-[1.6rem] text-[#FFFFFF]">
              {naira(5000000)}
            </span>
          </p>
          <div className=" p-[1.75rem] bg-neutral200">
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
            <Line />
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

      <div className="pb-[2.5rem] pt-[1.875rem]">
        <h2 className="text-[#1D2433] font-[700] text-[1.25rem] pb-[1.25rem]">
          Reviews
        </h2>

        <div>
          <ReviewsComponent />
        </div>
      </div>

      <FaqAccordion faqList={faqList} />

      <div className="pb-[2.5rem] pt-[1.875rem]">
        <h2 className="text-[#1D2433] font-[700] text-[1.25rem] pb-[1.25rem]">
          Lokking for Similar Vacation Packages
        </h2>

        <section
          className=" gap-[1.5rem] w-[100%] flex-col flex flex-row md:gap-[1.5rem]  w-[100%]
                md:grid md:grid-cols-4 
                "
        >
          {data.map((d, index) => (
            <VacationPackageCard d={d} key={index} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default HotelDetail;

const data = [
  {
    name: "Dubai Easter Package",
    days: "5",
    image: "/assets/vacation-packages/vacation-img-1.png",
  },
  {
    name: "Baecation on Miami",
    days: "4",
    image: "/assets/vacation-packages/vacation-img-2.png",
  },
  {
    name: "A Taste of Thailand",
    days: "3",
    image: "/assets/vacation-packages/vacation-img-3.png",
  },
  {
    name: "Paradise in Tokyo",
    days: "1",
    image: "/assets/vacation-packages/vacation-img-4.png",
  },
  {
    name: "Dubai Easter Package",
    days: "5",
    image: "/assets/vacation-packages/vacation-img-1.png",
  },
  {
    name: "Baecation on Miami",
    days: "4",
    image: "/assets/vacation-packages/vacation-img-2.png",
  },
  {
    name: "A Taste of Thailand",
    days: "3",
    image: "/assets/vacation-packages/vacation-img-3.png",
  },
  {
    name: "Paradise in Tokyo",
    days: "1",
    image: "/assets/vacation-packages/vacation-img-4.png",
  },
  {
    name: "Dubai Easter Package",
    days: "5",
    image: "/assets/vacation-packages/vacation-img-1.png",
  },
  {
    name: "Baecation on Miami",
    days: "4",
    image: "/assets/vacation-packages/vacation-img-2.png",
  },
  {
    name: "A Taste of Thailand",
    days: "3",
    image: "/assets/vacation-packages/vacation-img-3.png",
  },
  {
    name: "Paradise in Tokyo",
    days: "1",
    image: "/assets/vacation-packages/vacation-img-4.png",
  },
  {
    name: "Dubai Easter Package",
    days: "5",
    image: "/assets/vacation-packages/vacation-img-1.png",
  },
  {
    name: "Baecation on Miami",
    days: "4",
    image: "/assets/vacation-packages/vacation-img-2.png",
  },
  {
    name: "A Taste of Thailand",
    days: "3",
    image: "/assets/vacation-packages/vacation-img-3.png",
  },
  {
    name: "Paradise in Tokyo",
    days: "1",
    image: "/assets/vacation-packages/vacation-img-4.png",
  },
];
