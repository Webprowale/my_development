import { TripActionsType } from "@/interfaces";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TripActions = ({
  title = "Activities",
  subtitle = "Subtitle Text here",
  url = "#",
  className,
  btnClass,
  titleClass,
  subtitleClass,
  ctaText,
}: TripActionsType) => {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-between bg-[#000031] p-4 rounded h-[195px] max-h-[195px] text-white",
        className,
      )}
    >
      <div className="">
        <h3 className={cn("font-semibold mb-2", titleClass)}>{title}</h3>
        <p className={cn("text-sm font-normal", subtitleClass)}>{subtitle}</p>
      </div>
      <Link
        href={url}
        className={cn(
          "bg-primary600 hover:bg-primary700 ease-linear duration-150 text-center text-sm font-normal text-white rounded p-3 w-full tracking-normal",
          btnClass,
        )}
      >
        {ctaText}
      </Link>
    </div>
  );
};

export default TripActions;
