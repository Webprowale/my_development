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
// import SectionLayout from "./section";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function CarouselComponent({
  content,
  baseNumber,
  data,
}: {
  data: any;
  content: React.ReactElement;
  baseNumber: string;
}) {
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
    <Carousel setApi={setApi}>
      <CarouselContent>
        {data?.map((_: any, index: number) => (
          <CarouselItem key={index} className={baseNumber}>
            {content}
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
  );
}

export default CarouselComponent;
