"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardOverview from "@/components/dashboard/dashboardOverview/DashboardOverview";
import { addCommasToNumber } from "@/utils";
import {
  CurrencyNgn,
  DotsThree,
  MagnifyingGlass,
  MapPin,
  PencilSimpleLine,
  SlidersHorizontal,
  XSquare,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import VisaTable from "@/components/dashboard/applications/visa/VisaTable";
import { VisaBookingsColumns } from "@/components/dashboard/applications/visa/Columns";
import { visaData } from "@/components/dashboard/applications/hotel/data";
import InvoiceModal from "@/components/dashboard/applications/InvoiceModal";
import { useState } from "react";

const VisaTab = () => {
  const [mobileValue,setMobileValue]= useState('active');

  return (
    <>
    <div
      className="py-[1rem] px-[0.563rem]"
    >

    <div className="overview-list grid grid-cols-2 md:grid-cols-4 gap-4">
       {data?.map((overview: any, index: number) => (
         <DashboardOverview
           key={index}
           title={overview.title}
           value={overview.number}
           mark={overview.mark}
           percent={overview.percent}
         />
       ))}
     </div>

     <section className="bg-white p-6 rounded mt-8">
       <header className="flex items-center justify-between md:mb-6">
         <h2 className="font-medium text-lg">Reservations</h2>

         <div className="table-actions flex items-center gap-2">
           <div className="hidden search relative md:block">
             {/* <input type="text" id="search" placeholder="Search" /> */}
             <Input
               className="pl-7 text-[#667185] focus-within:outline-none focus:outline-none focus-within:border-primary600 focus-visible:ring-transparent"
               placeholder="Search"
             />
             <MagnifyingGlass
               size={18}
               className="absolute left-2 text-[#667185] top-[50%] translate-y-[-50%]"
             />
           </div>
           <DropdownMenu>
             <DropdownMenuTrigger className="flex items-center gap-1 py-2 px-4 border rounded hover:bg-gray-100">
               <SlidersHorizontal size={15} />
               Filter
             </DropdownMenuTrigger>
             <DropdownMenuContent>
               <DropdownMenuItem>Class</DropdownMenuItem>
               <DropdownMenuItem>Type</DropdownMenuItem>
               <DropdownMenuItem>Amount</DropdownMenuItem>
             </DropdownMenuContent>
           </DropdownMenu>
         </div>
       </header>

       {/* Table tabs */}
       {/* <HotelReservations columns={ActiveBookingsColumns} data={tableData} /> */}
     </section>

     <div  className="block md:hidden">
<br />
       
     <Select
                 onValueChange={(value) => setMobileValue(value)}
                 value={mobileValue}
               >
                 <SelectTrigger className="w-full p-3 rounded">
                   <SelectValue className="" placeholder="Select Booking" />
                 </SelectTrigger>
                 <SelectContent className="">
                   <SelectItem className="p-1 " value="active">
                     Active Booking
                   </SelectItem>
                   <SelectItem className="p-1 " value="past">
                   Past Booking
                   </SelectItem>
                   <SelectItem className="p-1 " value="cancel">
                   Cancelled Bookings
                   </SelectItem>
                 </SelectContent>
                 
               </Select>
<br />

     </div>
     <VisaTable columns={VisaBookingsColumns} data={visaData} />


     {/* invoice modal */}
     <InvoiceModal />
    </div>
   </>
  );
};

const NextReservation = () => {
  return (
    <div className="overview min-h-[250px] flex flex-col justify-between relative p-4 bg-white overflow-hidden">
      <h3 className="font-medium text-[15px]">Next Reservation</h3>

      <div className="overview-data flex flex-col items-start justify-between text-[#647995] text-[12px] mt-5">
        <Image
          src={"/assets/reservation.png"}
          width={80}
          height={80}
          className="w-[80px] h-[80px] rounded object-cover"
          alt=""
        />

        <p className="flex items-center gap-2">
          <span className="text-[#9747FF]">
            <MapPin size={16} weight="fill" />
          </span>
          <span>Melbourne, Australia</span>
        </p>
        <h4 className="font-medium text-[#000000] text-sm my-2">
          Colosseum Underground and Arena Floor Tour
        </h4>
        <div className="reserve-cta flex mt-3 items-center justify-stretch w-full gap-1">
          <Link
            href={"#"}
            className="inline-flex items-center justify-center w-full bg-primary600 text-white p-2 text-sm rounded"
          >
            View Details
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="p-2">
                <DotsThree size={25} weight="bold" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  href={"#"}
                  className="flex items-center gap-2 p-2 rounded text-sm"
                >
                  <PencilSimpleLine size={18} />
                  <span>Edit Details</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={"#"}
                  className="flex items-center gap-2 p-2 rounded text-sm"
                >
                  <XSquare size={18} />
                  <span>Cancel Bookings</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <img
        src="/assets/dashboard-card.svg"
        alt="beehive image"
        className="absolute top-3 right-2"
      />
    </div>
  );
};

const data = [
  {
    title: "Applications in Progress",
    number: 100,
    mark: "applications made increased by 20",
    percent: "+1.01%",
  },
  {
    title: "Total Applications",
    number: 100,
    mark: "applications made increased by 20",
    percent: "+1.01%",
  },
  {
    title: "Processed Applications",
    number: 4,
    mark: "processed applications increased by 2",
    percent: "+0.49%",
  },
  {
    title: "Total Amount Spent",
    number: (
      <span className="flex items-center gap-1">
        <CurrencyNgn />
        {addCommasToNumber(100000000)}
      </span>
    ),
    mark: "total amount spent increased by 10.20",
    percent: "-0.91%",
  },
];

export default VisaTab;
