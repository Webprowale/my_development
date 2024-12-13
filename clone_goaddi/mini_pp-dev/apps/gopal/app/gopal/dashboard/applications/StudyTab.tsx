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
import InvoiceModal from "@/components/dashboard/applications/InvoiceModal";
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
import HotelReservations from "@/components/dashboard/applications/HotelReservations";
import { ActiveBookingsColumns } from "@/components/dashboard/applications/study/Columns";
import tableData from "@/components/dashboard/applications/study/data.json";
import PastBookings from "@/components/dashboard/applications/hotel/PastBookings";
import {
  cancelData,
  pastData,
} from "@/components/dashboard/applications/hotel/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CancelledBookings from "@/components/dashboard/applications/hotel/CancelledBookingns";
import VisaTable from "@/components/dashboard/applications/visa/VisaTable";
import { VisaBookingsColumns } from "@/components/dashboard/applications/visa/ColumnsStudy";
import { visaData } from "@/components/dashboard/applications/hotel/data";
import { useState } from "react";

const StudyTab = () => {
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

export default StudyTab;
