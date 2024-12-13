import OverviewGroup from "@/components/gobusiness/overview/OverviewGroup";
import { followersToShortCode } from "@/utils";
import {
  AirplaneTilt,
  Buildings,
  CaretDown,
  Coins,
  CurrencyNgn,
  Package,
  Receipt,
  RoadHorizon,
  ShoppingBagOpen,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import OverviewChart from "@/components/gobusiness/overview/OverviewChart";

export default function Page() {
  return (
    <main className="flex flex-col gap-4 mb-10">
      <header className="px-4 py-5 bg-white md:rounded font-bold text-2xl ">
        Overview
      </header>

      {/* Overview */}
      <OverviewGroup />

      {/* Quick links */}
      <section className="col-span-4 w-[95%] mx-auto md:w-full grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          href={"#"}
          className="border-2 border-primary500 rounded p-4 bg-white flex items-center gap-2 hover:bg-primary100 ease-in transition-all"
        >
          <Image
            src={"/assets/gobusiness/create-icon.svg"}
            width={40}
            height={40}
            className=""
            alt=""
          />
          <span className="font-semibold text-[#1D2433] text-xl">
            Create Expense Request
          </span>
        </Link>
        <Popover>
          <PopoverTrigger asChild>
            <button className="border-2 border-primary500 rounded p-4 bg-white flex items-center gap-2 hover:bg-primary100 ease-in transition-all">
              <Image
                src={"/assets/gobusiness/book-icon.svg"}
                width={40}
                height={40}
                className=""
                alt=""
              />
              <span className="font-semibold text-[#1D2433] text-xl">
                Book a Product
              </span>

              <CaretDown
                size={21}
                weight="bold"
                color="#0D6EFD"
                className="ml-auto"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="">
            <Link
              href={"#"}
              className="flex items-center gap-2 py-4 px-3 rounded hover:bg-[#F0F2F5]"
            >
              <AirplaneTilt size={20} />
              <span>Flights</span>
            </Link>
            <Link
              href={"#"}
              className="flex items-center gap-2 py-4 px-3 rounded hover:bg-[#F0F2F5]"
            >
              <Buildings size={20} />
              <span>Hotels</span>
            </Link>
            <Link
              href={"#"}
              className="flex items-center gap-2 py-4 px-3 rounded hover:bg-[#F0F2F5]"
            >
              <RoadHorizon size={20} />
              <span>Activities</span>
            </Link>
            <Link
              href={"#"}
              className="flex items-center gap-2 py-4 px-3 rounded hover:bg-[#F0F2F5]"
            >
              <Package size={20} />
              <span>Vacation Packages</span>
            </Link>
          </PopoverContent>
        </Popover>
        <Link
          href={"#"}
          className="border-2 border-primary500 rounded p-4 bg-white flex items-center gap-2 hover:bg-primary100 ease-in  transition-all"
        >
          <Image
            src={"/assets/gobusiness/plan-icon.svg"}
            width={40}
            height={40}
            className=""
            alt=""
          />
          <span className="font-semibold text-[#1D2433] text-xl">
            Plan a Trip
          </span>
        </Link>
        <Link
          href={"#"}
          className="border-2 border-primary500 rounded p-4 bg-white flex items-center gap-2 hover:bg-primary100 ease-in duration-100"
        >
          <Image
            src={"/assets/gobusiness/transfer-icon.svg"}
            width={40}
            height={40}
            className=""
            alt=""
          />
          <span className="font-semibold text-[#1D2433] text-xl">
            Transfer Funds
          </span>
        </Link>
      </section>

      {/* spending section */}
      <section className="w-[95%] md:w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 md:row-span-2 bg-white min-h-11 rounded">
          <OverviewChart />
        </div>
        <div className="min-h-11 md:col-start-4 md:col-end-5 rounded bg-white px-4 py-6">
          <Image
            src={"/assets/gobusiness/money-icon.svg"}
            width={60}
            height={60}
            className=""
            alt=""
          />
          <div className="flex flex-col gap-1 mt-4">
            <h3 className="text-base font-bold text-[#676E7E]">
              Overall Amount Requested
            </h3>
            <p className="text-[2.5rem] text-black font-bold flex items-center">
              <CurrencyNgn
                size={40}
                weight="bold"
              />
              {followersToShortCode(140000)}
            </p>
          </div>
        </div>
        <div className="p-4 bg-white rounded">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-[#676E7E]">
                Overall Amount Approved/Disbursed
              </h3>
              <p className="text-[2.5rem] text-black font-bold flex items-center">
                <CurrencyNgn
                  size={40}
                  weight="bold"
                />
                {followersToShortCode(110000)}
              </p>
            </div>
          </div>
          <hr className="mb-3 mt-8" />

          {/* The breakdown */}
          <div className="breakdown flex flex-col gap-3">
            <div className="flex items-center justify-between w-full text-[#676E7E]">
              <div className="flex items-center gap-1">
                <Receipt size={18} />
                <h4 className="text-sm">Expenses</h4>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="font-bold text-[#676E7E] flex items-center gap-[2px]">
                  <CurrencyNgn
                    size={13}
                    weight="bold"
                  />
                  {followersToShortCode(50000)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between w-full text-[#676E7E]">
              <div className="flex items-center gap-1">
                <ShoppingBagOpen size={18} />
                <h4 className="text-sm">Products</h4>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="font-bold text-[#676E7E] flex items-center gap-[2px]">
                  <CurrencyNgn
                    size={13}
                    weight="bold"
                  />
                  {followersToShortCode(50000)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between w-full text-[#676E7E]">
              <div className="flex items-center gap-1">
                <Coins size={18} />
                <h4 className="text-sm">Funds</h4>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="font-bold text-[#676E7E] flex items-center gap-[1px]">
                  <CurrencyNgn
                    size={13}
                    weight="bold"
                  />
                  {followersToShortCode(50000)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
