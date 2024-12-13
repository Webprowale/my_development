import GoBack from "@/components/trip-planner/GoBack";
import Approvals from "@/components/trip-planner/collaborator/Approvals.";
import CollaborationComment from "@/components/trip-planner/collaborator/CollaborationComment";
import CommentForm from "@/components/trip-planner/collaborator/CommentForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CurrencyNgn, Info } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { addCommasToNumber } from "@/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Suspense } from "react";
import SplitPayModal from "@/components/trip-planner/collaborator/SplitPayModal";

const Page = () => {
  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-[minmax(0,65%)_minmax(0,35%)] min-h-screen bg-white rounded mb-20">
        {/* Main section */}
        <section className="border-r border-r-[#E4E7EC]">
          {/* header section */}
          <header className="p-5 mb-5 flex flex-col items-start">
            <GoBack className="relative inset-0 bg-transparent p-0 w-auto mb-3" />
            {/* <Button className="bg-transparent mb-3 p-0 ">
            <ArrowLeft
              size={20}
              weight="bold"
              className="text-black"
            />
          </Button> */}
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-xl mb-1">
                Trip Planner Collaboration
              </h1>
              <p className="text-sm text-[#647995] w-full md:w-[68%]">
                New York City, USA
              </p>
            </div>
          </header>

          {/* overview */}
          <div className="px-5 pb-10 border-b border-b-[#E4E7EC] grid grid-cols-3 gap-6">
            <div className="relative flex flex-col h-[222px] rounded overflow-hidden bg-primary600 text-white justify-center pl-8">
              <h2 className="text-4xl font-bold mb-2 relative z-10">10</h2>
              <p className="relative z-10">Flight</p>
              <Link
                href={"#"}
                className="underline underline-offset-4 relative z-10"
              >
                view
              </Link>
              <img
                alt=""
                src="/assets/collab-flight.svg"
                className="w-full h-full absolute right-0 top-0 bottom-0"
              />
            </div>
            <div className="relative flex flex-col h-[222px] rounded overflow-hidden bg-primary100 text-primary600 justify-center pl-8">
              <h2 className="text-4xl font-bold mb-2 relative z-10">5</h2>
              <p className="relative z-10">Hotels</p>
              <Link
                href={"#"}
                className="underline underline-offset-4 relative z-10"
              >
                view
              </Link>
              <img
                alt=""
                src="/assets/collab-hotel.svg"
                className="w-full h-full absolute right-[-40px] top-0 bottom-0"
              />
            </div>
            <div className="relative flex flex-col h-[222px] rounded overflow-hidden bg-primary900 text-white justify-center pl-8">
              <h2 className="text-4xl font-bold mb-2 relative z-10">14</h2>
              <p className="relative z-10">Activities</p>
              <Link
                href={"#"}
                className="underline underline-offset-4 relative z-10"
              >
                view
              </Link>
              <img
                alt=""
                src="/assets/collab-wave.svg"
                className="w-full absolute left-0 right-0 top-0"
              />
              <img
                alt=""
                src="/assets/collab-activity.svg"
                className="w-[52px] h-[67px] absolute right-2 bottom-0"
              />
            </div>
          </div>

          {/* Approvals */}
          <section className="p-5 pt-10">
            {/* Approvals header */}
            <header className="mb-8 flex items-center justify-between">
              <div className="">
                <h2 className="text-[#1D2433] text-xl font-bold">
                  Collaborator Approvals
                </h2>
                <p className="text-[#647995] text-sm">
                  This shows all collaborator requests you have
                </p>
              </div>

              <Link
                href={`/gopal/trip-planner/trip/5/collaborator?split=open`}
                className="text-sm text-primary600 underline underline-offset-2"
              >
                See split payment info
              </Link>
            </header>

            {/* Approval list */}
            <div className="flex flex-col gap-8">
              <Approvals />
              <Approvals />
              <Approvals />
            </div>
          </section>
        </section>

        {/* Comment section */}
        <section className="collaborator-comment ">
          <header className="flex items-center justify-between p-5">
            <h2 className="font-semibold text-[#1D2433]">
              Itinerary Discussion
            </h2>
            <div className="img-group flex items-center">
              <img
                src="/assets/trip-timeline/1.png"
                alt=""
                className="w-[30px] h-[30px] object-cover"
              />
              <img
                src="/assets/trip-timeline/2.png"
                alt=""
                className="w-[30px] h-[30px] object-cover ml-[-12px]"
              />
              <div className="w-[30px] h-[30px] grid place-content-center ml-[-12px] bg-primary200 text-primary600 text-xs rounded-full font-medium">
                <p>10+</p>
              </div>
            </div>
          </header>

          {/* Comment form */}
          <div className="form p-5">
            <CommentForm />
          </div>

          {/* Comment list */}
          <div className="flex flex-col gap-8 border-t border-t-[#E4E7EC] p-5 max-h-[60vh] overflow-auto scrollbar-thin">
            <CollaborationComment />
            <CollaborationComment />
            <CollaborationComment />
            <CollaborationComment />
            <CollaborationComment />
          </div>
        </section>
      </main>

      {/* Page total price and cta's */}
      <section className="fixed left-0 right-0 py-2 px-16 w-full bg-[#F9FAFB] bottom-0 z-50 flex justify-end border-t border-t-[#D0D5DD]">
        <div className="w-[80%]  flex items-center justify-between">
          <div className="">
            <h4 className="flex items-center gap-2 text-[#676E7E]">
              <span>Total Price:</span>
              <p className="font-bold text-2xl flex items-center text-[#1D2433]">
                <span>
                  <CurrencyNgn />{" "}
                </span>
                <span>{addCommasToNumber(1123450)}.00</span>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info
                        size={18}
                        className="text-primary600 ml-2"
                        weight="bold"
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/70">
                      <div className="flex flex-col gap-2">
                        <div className="">
                          <h4 className="text-[#ABABAB] font-normal">
                            Flights
                          </h4>
                          <p className="text-white flex items-center gap-1">
                            <CurrencyNgn size={18} />
                            110,000{" "}
                          </p>
                        </div>
                        <div className="">
                          <h4 className="text-[#ABABAB] font-normal">Hotels</h4>
                          <p className="text-white flex items-center gap-1">
                            <CurrencyNgn size={18} />
                            110,000{" "}
                          </p>
                        </div>
                        <div className="">
                          <h4 className="text-[#ABABAB] font-normal">
                            Activities
                          </h4>
                          <p className="text-white flex items-center gap-1">
                            <CurrencyNgn size={18} />
                            110,000{" "}
                          </p>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
            </h4>
          </div>
          <div className="flex items-center gap-2 w-[35%]">
            <Button className="text-primary600 bg-primary100 rounded hover:bg-primary200 ease-linear duration-150 w-[50%]">
              Save to draft
            </Button>
            <Button className="bg-primary600 rounded text-white hover:bg-primary700 ease-linear duration-150 w-[50%]">
              Next
            </Button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <Suspense>
        <SplitPayModal />
      </Suspense>
    </>
  );
};

export default Page;
