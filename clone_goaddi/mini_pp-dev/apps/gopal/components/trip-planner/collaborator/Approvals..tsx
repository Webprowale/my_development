import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Approvals = () => {
  return (
    <div className="flex items-start gap-3">
      <Image
        src={"/assets/avatar.png"}
        width={48}
        height={48}
        quality={80}
        alt=""
        className="rounded-full"
      />
      <div className="flex flex-col items-start">
        <h3 className="font-medium">Bimpe Adeleke</h3>
        <p className="text-[#1D2433] font-normal w-[90%]">
          Suggested a change to the itinerary for the Epic European Adventure
          trip.
        </p>
        <Link
          href={"#"}
          className="underline underline-offset-4 inline-block mt-2 text-primary600 text-sm"
        >
          view
        </Link>
      </div>
      {/* cta */}
      <div className="flex flex-col gap-2 ml-auto">
        <Button
          variant={"default"}
          className=" bg-primary600 hover:bg-primary700 text-white px-10 py-2 rounded"
        >
          Accept
        </Button>
        <Button
          variant={"default"}
          className=" bg-red-50 hover:bg-red-100  text-red-600 px-10 py-2 rounded"
        >
          Reject
        </Button>
      </div>
    </div>
  );
};

export default Approvals;
