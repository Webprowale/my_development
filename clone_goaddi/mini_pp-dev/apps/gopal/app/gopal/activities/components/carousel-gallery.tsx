"use client";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselApi,  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const CarouselGallery = ({ imageGallery }: { imageGallery: any }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
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

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        {imageGallery?.map((image: any, index: number) => (
          <CarouselItem
            key={index}
            className="basis-1/2 h-[400px] transition-all duration-300"
          >
            <img src={image?.Image} alt="gallery" className="h-full w-full" />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="flex w-full justify-center my-4 mt-10">
        <div className="absolute -bottom-14 my-12">
          <div className="w-full flex flex-row space-x-2 items-center">
            <CarouselPrevious>
              <IoIosArrowBack size={20} color="black" />
            </CarouselPrevious>
            {imageGallery?.map((image: any, index: number) => (
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
};

export default CarouselGallery;
