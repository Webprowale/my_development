import { IoIosArrowForward } from "react-icons/io";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/post-carousel";
import SectionLayout from "../../activities/components/section";
import Image from "next/image";

const HotelTopDesitinations = () => {
  return (
    <SectionLayout
      title="Top Destinations"
      description="Unforgettable Experiences Await 🎉"
    >
      <div className="grid grid-cols-3 self-center gap-3">
        {[...new Array(6)].map(() => (
          <div className="w-full">
            <div className="hotel-gallery relative self-center py-4">
              <Carousel className="w-full h-full">
                <CarouselContent className="h-full">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <Image
                        src={"/assets/top-destination.png"}
                        alt=""
                        width={100}
                        height={100}
                        sizes="100"
                        className=" h-96 max-h-full w-full"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex absolute bottom-0 py-10 px-4 left-0 right-0  bg-gradient-to-b from-transparent to-black">
                  <div className="flex flex-row justify-between text-white items-center  w-full px-2 py-px ">
                    <div className="flex flex-col">
                      <div className=" font-semibold">Lagos, Nigeria</div>
                    </div>

                    <IoIosArrowForward size={20} />
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};

export default HotelTopDesitinations;
