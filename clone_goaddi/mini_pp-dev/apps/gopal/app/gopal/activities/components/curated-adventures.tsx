"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionLayout from "./section";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function CuratedAdventures() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleChangeCarousel = (index: number) => {
    if (!api) {
      return null;
    }

    api?.scrollTo(index);
  };

  // this part

  return (
    <SectionLayout
      title="Curated Adventures"
      description="Explore curated adventures that go beyond the ordinary 🚀"
    >
      
      <Carousel setApi={setApi}>
        <CarouselContent>
          {[...new Array(6)].map((_, index) => (
            <CarouselItem key={index} className="basis-1/3">
              <div className="flex flex-col w-full h-full py-4">
                <img
                  src={"/assets/curated_adventure.png"}
                  alt=""
                  className="h-[450px] max-h-full w-full "
                />

                <div className="font-semibold">Fun</div>

                <div className="text-normal">100 tours</div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>


        <div className="flex w-full justify-center my-4">
          <div className="absolute -bottom-14 my-12">
            <div className="w-full flex flex-row space-x-2 items-center">
              <CarouselPrevious>
                <IoIosArrowBack size={20} color="black" />
              </CarouselPrevious>
              {[...new Array(count)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleChangeCarousel(index)}
                  className={`w-3 h-3 rounded-full ${index === current - 1 ? "bg-blue-500" : "bg-gray-300"}`}
                ></button>
              ))}
              <CarouselNext>
                <IoIosArrowForward size={20} />
              </CarouselNext>
            </div>
          </div>
        </div>
      </Carousel>

    </SectionLayout>
  );
}

export default CuratedAdventures;
