import React from "react";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { PiUsersLight } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { MdVerifiedUser } from "react-icons/md";
import { ActivitiesHeaderInfo } from "../../activities/activities-header-info";

interface IPageHeader {
  pageTitle: string;
  pageDescription?: string;
  searchUrl?: string;
  searchMode?: "flights" | "hotels";
  backgroundImage?: string;
}

const PageHeader = ({
  pageTitle,
  pageDescription,
  backgroundImage,
}: IPageHeader) => {
  const styles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "contain",
    backgroundPosition: "top",
  };

  return (
    <section style={styles} className="relative p-4 bg-cover">
      <div className="text-white">
        <h3 className="text-2xl font-bold">{pageTitle}</h3>
        {pageDescription && (
          <p className="w-[40%] font-normal text-sm mt-2">{pageDescription}</p>
        )}
      </div>

      {/* Search component */}
      <div className="px-2 py-2 mt-16 bg-white">
        <div className="border flex justify-between my-2 w-full bg-gray-100 rounded text-[#647995]">
          <ActivitiesHeaderInfo
            icon={<CiLocationOn size={20} />}
            label="Destination"
            descr="Where are you going?"
            className="pl-6"
          />

          <div className="flex gap-12">
            <ActivitiesHeaderInfo
              icon={<CiCalendar size={20} />}
              label="From"
              descr="Enter Date"
            />

            <ActivitiesHeaderInfo
              icon={<CiCalendar size={20} />}
              label="To"
              descr="Enter Date"
            />

            <ActivitiesHeaderInfo
              icon={<PiUsersLight size={20} />}
              label="Participants"
              descr="1 Adult"
            />
          </div>

          <div className="h-full px-6 py-12 bg-blue-600 w-fit flex-center">
            <FiSearch color="white" size={22} />
          </div>
        </div>

        <div className="flex justify-between w-full py-2">
          <p className="flex items-center text-sm gap-1">
            <MdVerifiedUser className="text-sm" />
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
  );
};

export default PageHeader;
