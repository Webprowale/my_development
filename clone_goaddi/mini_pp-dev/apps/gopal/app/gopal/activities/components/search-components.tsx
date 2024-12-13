import React, { SetStateAction, useEffect, useState } from "react";
import PageSearch, { SearchBar } from "../../components/page-search";
import { DateSelect } from "../../components/page-search/date-select";
import {
  DestinationSelect,
  IDestinationOption,
} from "../../components/page-search/destination-select";
import { PassengerSelect } from "../../components/page-search/passengers-select";
import { usePathname, useRouter } from "next/navigation";

type searchType = {
  cityId?: string;
  countryId?: string;
  location?: string;
  departureDay?: string;
  returnDay?: string;
  passenger?: string;
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchComponent = ({
  cityId,
  countryId,
  location,
  departureDay,
  returnDay,
  passenger,
  isLoading,
  setIsLoading,
}: searchType) => {
  const [destination, setDestination] = useState<
    IDestinationOption | undefined
  >(undefined);
  const [departureDate, setDepartureDate] = useState<Date | null>(
    departureDay ? new Date(departureDay) : null,
  );
  const [returnDate, setReturnDate] = useState<Date | null>(
    returnDay ? new Date(returnDay) : null,
  );
  const [passengers, setPassengers] = useState<string>(passenger || "");
  const [err, setErr] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  function formatDate(inputDate: string | Date) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
  }
  const formattedDepartureDate = departureDate ? formatDate(departureDate) : "";
  const formattedReturnDate = returnDate ? formatDate(returnDate) : "";

  function extractNumbersWithTitle(inputString: string): {
    [key: string]: number;
  } {
    const regex: RegExp = /(\d+)\s*(Adult|Child|Infant)/gi;
    const matches = inputString.match(regex);
    const result: { [key: string]: number } = {
      Adult: 1,
      Child: 0,
      Infant: 0,
    };

    if (matches) {
      for (const match of matches) {
        const [numberString, title] = match.split(" ");
        const number = parseInt(numberString, 10);
        result[title] = number;
      }
    }

    return result;
  }

  console.log(passengers);

  useEffect(() => {
    if (pathname.includes("search-result")) {
      const destinationOption: IDestinationOption = {
        title: location || "",
        countryId: countryId || "",
        cityId: cityId || "",
      };
      setDestination(destinationOption);
      setDepartureDate(departureDay ? new Date(departureDay) : null);
      setReturnDate(returnDay ? new Date(returnDay) : null);
      setPassengers(passenger || "");
    }
  }, [
    cityId,
    countryId,
    location,
    departureDay,
    returnDay,
    passenger,
    pathname,
  ]);

  function handleSearch() {
    const extractedData = extractNumbersWithTitle(passengers);

    if (
      !destination ||
      !departureDate ||
      !returnDate ||
      passengers === "" ||
      departureDate >= returnDate
    ) {
      setErr("Missing or incorrect field(s)");
      return;
    }
    setErr("");
    setIsLoading(true);
    router.push(
      `/gopal/activities/search-result?destination=${destination?.title || ""}&cityId=${destination.cityId}&countryId=${destination.countryId}&departure=${formattedDepartureDate}&return=${formattedReturnDate}&adult=${extractedData.Adult}&child=${extractedData.Child}&infant=${extractedData.Infant}`,
    );
  }

    const isDateBeforeToday = (date: Date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    };
    const customDateDisabled = (date: Date) => {
      return isDateBeforeToday(date);
    };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minSelectableDate = departureDate || today;


  return (
    <PageSearch
      pageTitle={"Activities"}
      pageDescription={
        "Embark on unforgettable experiences - Discover a world of tours, attractions, and activities to complement your trip and create lasting memories."
      }
      backgroundImage="/assets/back.png"
    >
      <SearchBar handleSearch={handleSearch} isLoading={isLoading}>
        <div className="grid w-full h-full grid-cols-5 gap-1">
          <div
            className={`relative grid grid-cols-1 col-span-2 gap-1 ${!destination && err && "border-red-500 border rounded"}`}
          >
            <DestinationSelect
              setValue={setDestination}
              value={destination}
              apiFor="activities"
              label="Destination"
            />
          </div>

          <DateSelect
            setValue={setDepartureDate}
            value={departureDate}
            label="From Date"
            disabledPrevDate={customDateDisabled}
          />

          <DateSelect
            setValue={setReturnDate}
            value={returnDate}
            label="To Date"
            disabledPrevDate={{ before: minSelectableDate }}
          />

          <div className={`${passengers === "" && err && "border-red-500 border rounded"}`}>
            <PassengerSelect
              setValue={setPassengers}
              value={passengers}
              label="Participants"
            />
          </div>
        </div>
      </SearchBar>
    </PageSearch>
  );
};

export default SearchComponent;
