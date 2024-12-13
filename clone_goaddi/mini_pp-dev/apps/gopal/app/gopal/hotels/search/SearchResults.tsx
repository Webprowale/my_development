"use client";
import { useEffect, useState } from "react";
import { ActivitiesHeaderInfo } from "../../activities/activities-header-info";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { IoGrid } from "react-icons/io5";
import { PiUsersLight } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { MdVerifiedUser } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import ListFlightView from "../components/ListFlightViewCard";
import ResultFilter from "@/components/ResultFilter";
import GridFlightViewCard from "../components/GridFlightViewCard";
import { FaListUl } from "react-icons/fa6";
import { SearchBar } from "../components/page-search";
import { DateSelect } from "../components/page-search/date-select";
import {
  ILocationOptions,
  LocationSelect,
} from "../components/page-search/location-select";
import { PassengerSelect } from "../components/page-search/passengers-select";
import { useRouter, useSearchParams } from "next/navigation";
import { nightsBetweenDates } from "@/utils";
import {
  HotelSearch,
  getHotelDestinations,
} from "@/axios/endpoints/hotel.endpoint";
import { Hotel } from "lucide-react";
import { useHotelStore } from "@/store/useHotelStore";
import PropagateLoader from "react-spinners/PropagateLoader";

type PassengerTypes = {
  adult: number;
  child: number;
  rooms: number;
};

const SearchResults = () => {
  const [displayType, setDisplayType] = useState<"list" | "grid">("grid");
  const [fromLocation, setFromLocation] = useState<ILocationOptions>();
  const [toLocation, setToLocation] = useState<ILocationOptions>();
  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [returnDate, setReturnDate] = useState<Date>(new Date());
  const [passengers, setPassengers] = useState<PassengerTypes>();
  const router = useRouter();
  const params = useSearchParams();
  const [searchData, setSearchData] = useState({});
  let start = params.get("start");
  let end = params.get("end");
  let destination = params.get("destination");
  let adult = params.get("adult");
  let child = params.get("child");
  let rooms = params.get("rooms");
  let nights = params.get("nights");
  const { hotelList, loading, fetchHotels, searchId } = useHotelStore();

  // console.log(start, end, destination, adult, child, rooms, nights);

  function handleSearch() {
    // TODO: LOGIC TO CONVERT DATA INTO QUERY STRING
    // console.log(departureDate, returnDate, passengers, fromLocation);

    // this is when the user will lodge and also leave the hotel
    const startDate = departureDate.toISOString().split("T")[0];
    const endDate = returnDate.toISOString().split("T")[0];

    // The number of night(s) between the when they lodge and
    // leave the hotel accomodation
    const nights = nightsBetweenDates(startDate, endDate);

    const searchUrl = `/gopal/hotels/search?destination=${fromLocation?.title}&start=${startDate}&end=${endDate}&adult=${passengers?.adult}&child=${passengers?.child}&rooms=${passengers?.rooms}&nights=${nights}`;

    // push user to this route
    router.push(searchUrl);
  }

  // Search for results
  useEffect(() => {
    try {
      // generate a randon array for children ages
      const childrenAges = [...Array(Number(child)).keys()];

      // The search data gotten from the page url
      const searchData = {
        destination,
        rooms,
        nights,
        dates: `${start?.replaceAll("-", "/")} - ${end?.replaceAll("-", "/")}`,
        occupancy: [
          {
            room_no: rooms,
            adult,
            child,
            child_age: childrenAges,
          },
        ],
      };
      // get user hotel query
      fetchHotels(searchData);
    } catch (error) {
      console.log(error);
    }
  }, [fetchHotels]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader color="#0d6efd" />
      </div>
    );
  }

  return (
    <div className="space-y-6 ">
      <div className="font-[500] flex items-center gap-[0.483rem]">
        <p className="text-[#98A2B3] font-[0.875rem]">Hotels</p>
        <MdChevronRight />
        <p className="">Search Result</p>
      </div>
      <section className="header p-4">
        <div className="text-white w-2/6">
          <h3 className="font-bold text-2xl ">Hotels</h3>
          <p className="text-xs">
            Unwind and explore. Find your perfect stay - Discover hotels to suit
            your travel style and budget, for a seamless and relaxing start to
            your adventure.
          </p>
        </div>

        <div className="mt-16 px-2 py-2 bg-white">
          <SearchBar handleSearch={handleSearch}>
            <div className="grid w-full h-full grid-cols-5 gap-1 z-20">
              <div className="relative grid grid-cols-1 col-span-2 gap-1">
                <LocationSelect
                  setValue={setFromLocation}
                  value={fromLocation}
                  label="Destination"
                  searchPrompt="Start typing to search for cities."
                  apiFor="hotels"
                />
              </div>

              <DateSelect
                setValue={setDepartureDate}
                value={departureDate}
                label="From Date"
              />
              <DateSelect
                setValue={setReturnDate}
                value={returnDate}
                label="To Date"
              />
              <PassengerSelect
                setValue={setPassengers}
                value={passengers}
                label="Guest and Rooms"
              />
            </div>
          </SearchBar>

          <div className="w-full flex justify-between mt-4 mb-4">
            <p className="flex items-center gap-1">
              <MdVerifiedUser />
              <span>We guarantee the best value on your choice</span>
            </p>

            <p className="flex items-center gap-1">
              <span>Provided by </span>
              <img
                src="https://api.blog.shordem.hndwok.com/v1/media/ba3d8344-db20-4527-b7d1-c503c8f923bb.png/"
                alt="flight image"
              />
            </p>
          </div>
        </div>
      </section>

      <section className="py-4">
        {/* Navbar */}
        <div className=" flex items-center justify-between md:gap-[1rem]">
          <div
            className="w-[100%] gap-[1.5rem] flex flex-col md:flex-row items-center justify-between md:w-[70%]"
            // style={{border:'1px solid red'}}
          >
            <div className="grid gap-1 mb-4">
              <h3 className="font-bold text-xl">Hotels</h3>
              <p>Prioritizing affordability and ease 🎯💡</p>
            </div>
            <p className="font-[500] text-[1rem] text-[#1D2433]">
              Showing {hotelList?.length} Hotel Results
            </p>
          </div>
          <div
            className="hidden  md:w-[30%] text-right md:flex items-center justify-between"
            // style={{border:'1px solid blue'}}
          >
            <div className="gap-[1.063rem]  flex p-[0.563rem] border-[1px] border-[#D0D5DD] rounded-[1px] bg-white w-[75px]">
              <IoGrid
                className={`text-black hover:text-primary600 cursor-pointer ${displayType === "grid" ? "text-primary600" : ""}`}
                onClick={() => setDisplayType("grid")}
              />
              <FaListUl
                className={`text-black hover:text-primary600 cursor-pointer ${displayType === "list" ? "text-primary600" : ""}`}
                onClick={() => setDisplayType("list")}
              />
            </div>

            <p className="py-[0.5rem] px-[1.25rem] flex items-center text-[#1D2433] text-[1rem] font-[700] gap-[0.5rem] border-[1px] border-[#D0D5DD] rounded-[1px] bg-white">
              <img
                src="/assets/blacksorta.svg"
                alt=""
              />
              <span>Sort by:</span>
              <span>All</span>
            </p>
          </div>
        </div>
        {/* Navbar */}
        <br />

        <main className="flex items-start justify-between md:gap-[1.5rem]">
          {/* this is where the liist will be found */}

          {displayType === "list" ? (
            <section className="w-[100%] md:w-[75%] flex flex-col gap-[1.5rem]">
              {hotelList?.map((details: any, index: any) => (
                <ListFlightView
                  key={index}
                  hotelId={details?.hotelId}
                  name={details?.hotelName}
                  rating={details?.hotelRating}
                  productId={details?.productId}
                  image={details?.image}
                  location={details?.locality}
                  price={details?.totalPrice}
                  session={details?.sessionId}
                  token={details?.sessionId}
                  searchId={searchId}
                  rooms={details?.rooms}
                  nights={details?.rooms}
                />
              ))}
            </section>
          ) : (
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:w-[75%]">
              {hotelList?.map((details: any, index: number) => (
                <GridFlightViewCard
                  key={index}
                  hotelId={details?.hotelId}
                  name={details?.hotelName}
                  rating={details?.hotelRating}
                  productId={details?.productId}
                  image={details?.image}
                  location={details?.locality}
                  price={details?.totalPrice}
                  session={details?.sessionId}
                  token={details?.token}
                  searchId={searchId}
                  rooms={details?.rooms}
                  nights={details?.rooms}
                />
              ))}
            </section>
          )}

          <section className="hidden md:block w-[25%]">
            {/* this iis where the filter wiill be found */}
            <ResultFilter
              onChange={(recentUpdatedData: any) => {
                console.log({ ResultFilter: recentUpdatedData });
              }}
              schema={[
                {
                  name: "Shops",
                  data: [
                    "Any number of stop",
                    "Nonstop only",
                    "1 Stop",
                    "2 Stops",
                  ],
                  schemaType: "SelectMultipleTabs",
                },
                {
                  name: "Price Range",
                  schemaType: "minmax",
                  data: [], //
                },
                {
                  name: "Cabin",
                  data: [
                    { id: "1", label: "Economy", value: "40" },
                    { id: "2", label: "Premium Economy", value: "50" },
                    { id: "3", label: "Business Class", value: "120" },
                    { id: "4", label: "First Class", value: "10" },
                  ],
                  schemaType: "RadioTabs",
                },
                {
                  name: "Airlines",
                  data: [
                    { id: "1", label: "All", value: "" },
                    { id: "2", label: "Air Canada", value: "₦ 1,193,383.00" },
                    { id: "3", label: "Air China", value: "₦ 1,193,383.00" },
                    {
                      id: "4",
                      label: "Alaska Airlines",
                      value: "₦ 1,193,383.00",
                    },
                    {
                      id: "5",
                      label: "ANA (All Nippon Airways)",
                      value: "₦ 1,193,383.00",
                    },
                    {
                      id: "6",
                      label: "Austrian Airlines",
                      value: "1,193,383.00",
                    },
                  ],
                  schemaType: "SelectCheckBoxTabs",
                },
                {
                  name: "Airlines",
                  data: [
                    { id: "1", label: "All", value: "" },
                    { id: "2", label: "Air Canada", value: "₦ 1,193,383.00" },
                    { id: "3", label: "Air China", value: "₦ 1,193,383.00" },
                    {
                      id: "4",
                      label: "Alaska Airlines",
                      value: "₦ 1,193,383.00",
                    },
                    {
                      id: "5",
                      label: "ANA (All Nippon Airways)",
                      value: "₦ 1,193,383.00",
                    },
                    {
                      id: "6",
                      label: "Austrian Airlines",
                      value: "1,193,383.00",
                    },
                  ],
                  schemaType: "SelectCheckBoxTabs__hideValue",
                },
              ]}
            />
          </section>
        </main>
      </section>
    </div>
  );
};

export default SearchResults;
