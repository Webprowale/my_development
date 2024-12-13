import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Star } from "@phosphor-icons/react";
import React, { useState } from "react";
import { MdStar } from "react-icons/md";


const Review = React.forwardRef((props, ref) => {
  const [selectedOption, setSelectedOption] = useState("");



  return (
    <>
     <h4 className="font-bold text-[1.7rem] mb-4">Reviews</h4>
    <div  className="mb-5 bg-[#F9FAFB] flex flex-col border-2 border-[#e9eaeb] rounded-sm">
      <div className="flex flex-rows-1 sm:grid-cols-12">
        <div className="sm:col-span-4 p-5">
          <h6 className="font-base  mb-1">Sort By</h6>
          <div className="inline-block relative w-64 mb-5">
            <select
              value={selectedOption}
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="common">Most Common</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 8.293a1 1 0 011.414 0L10 10.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-1 mb-2">
               <p>
               <Star size={28} color="#F3A218" weight="fill" />
               </p>
            <p className="text-xl font-bold text-black">
              4.95
            </p>
            <p className="text-lg font-bold text-gray-500">
              /5
            </p>
          </div>
          <p className="text-sm font-medium text-gray-500 mt-4">
             1,210 users reviewed this hotel
          </p>
          {/* Star rating percentages */}

           <div className="p-4 border-[1px] border-[#E4E7EC] rounded-sm mt-4">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center pt-4">
              <a
                href="#"
                className="text-sm font-medium text-gray-500 hover:underline"
              >
                {stars} star
              </a>
              <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded-full">
                <div
                  className="h-5 bg-[#F3A218] rounded-full"
                  style={{ width: `${stars * 20}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-500">
                {`${stars * 20}%`}
              </span>
            </div>
          ))}
        </div>

        </div>

        <div className="sm:col-span-8 p-4 sm:p-5 border-[#E4E7EC] border-[1px] rounded-sm m-6">
        {[...new Array(3)].map((_, index) => (
          <article className="border-b  bg-white mb-4">
            <div className="flex items-center mb-4">
              <div className="">
                <p className="font-semibold">Jese Leos</p>
                <time
                  dateTime="2014-08-16 19:00"
                  className="block text-sm font-medium text-gray-500"
                >
                  Lagos, Nigeria | Apr 07, 2024
                </time>
              </div>
            </div>
            {/* Star rating */}
            <div className="flex items-center mb-1">
            <h3 className="mr-2 text-sm font-semibold text-gray-900">
                2.4
              </h3>
              {[...Array(5)].map((_, index) => (
                <Star 
                size={24} 
                color="#F3A218" 
                weight={index < 3 ? "fill" : undefined} 
                className="mx-1" 
            />
              ))}
             
            </div>
           
            {/* Review content */}
            <p className="mb-2 text-black">
            I love the practicality of this passport holder. My kids love it too. Although I am not giving it 4 stars because of the colour options presented. I will like to request the production of more feminine colours. Great product, but I need more colours!
            </p>
           
          </article>
        ))}

          <div className="">
          <Pagination>
      <PaginationContent>

        <PaginationItem >
          <PaginationPrevious href="#" isActive>
            N
          </PaginationPrevious>
        </PaginationItem>

        <PaginationItem  className="bg-[#0D6EFD] text-white rounded-md">
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>11</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>12</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" isActive />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    <div>

    </div>
          </div>

        </div>
      </div>
    </div>
    </>
   
  );
});

export default Review;
