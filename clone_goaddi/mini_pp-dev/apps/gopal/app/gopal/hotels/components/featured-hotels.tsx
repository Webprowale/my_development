import { CarouselApi } from "@/components/ui/carousel";
import SectionLayout from "../../activities/components/section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/post-carousel";
import {
  Carousel as BCarousel,
  CarouselApi as BCarouselApi,
  CarouselContent as BCarouselContent,
  CarouselItem as BCarouselItem,
  CarouselNext as BCarouselNext,
  CarouselPrevious as BCarouselPrevious,
} from "@/components/ui/carousel";
import { Heart } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const FeaturedHotels = () => {
  const [current, setCurrent] = useState(3);
  const [api, setApi] = useState<BCarouselApi>();

  const imageGallery = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const handleChangeCarousel = (index: number) => {
    if (!api) {
      return null;
    }
    console.log(index);
    api?.scrollTo(index);
  };
  console.log(api);
  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className=" bg-white">
      <BCarousel setApi={setApi} className="">
        <div>
          <SectionLayout
            title="Featured Hotels"
            description="Explore our selection of exceptional hotels. 🏨✨"
          >
            {" "}
            <BCarouselContent>
              {imageGallery?.map((image: any, index: number) => (
                <BCarouselItem
                  key={index}
                  className=" transition-all duration-300"
                >
                  <div>
                    <div className="grid grid-cols-3 gap-3 flex-col md:flex-row">
                      {[...new Array(3)].map(() => (
                        <div className="border rounded  h-full">
                          <div
                            className="hotel-gallery relative self-center "
                            //  style={{'border':'1px solid red'}}
                          >
                            <div className=" absolute top-[25px] right-0 left-0 mx-auto  z-[20] flex justify-between items-center w-[90%]">
                              <div className="bg-white/20 backdrop-blur-md p-[0.6rem] rounded-[50%] cursor-pointer">
                                <Heart
                                  size={20}
                                  className="text-white font-[700]"
                                />
                              </div>
                              <p
                                className="rounded-[4px] text-sm  py-[0.5rem] px-[1rem] text-white font-[500] text-[1.25rem]"
                                style={{ background: "#1D27394D" }}
                              >
                                1/5
                              </p>
                            </div>
                            <Carousel className="w-full h-full ">
                              <CarouselContent className="h-[370px]">
                                {Array.from({ length: 5 }).map((_, index) => (
                                  <CarouselItem key={index}>
                                    <Image
                                      width={100}
                                      height={100}
                                      sizes="100"
                                      src={"/assets/hotel.png"}
                                      alt=""
                                      className=" h-full max-h-full w-full "
                                    />
                                  </CarouselItem>
                                ))}
                              </CarouselContent>
                              <div className="flex absolute bottom-5 left-0 right-0 justify-center ">
                                <div className="flex md:gap-8 gap-8 bg-white/20 backdrop-blur-md px-2 py-px rounded-sm">
                                  <CarouselPrevious />
                                  <CarouselNext />
                                </div>
                              </div>
                            </Carousel>

                            <div className="flex items-center justify-between p-[.8rem]">
                              <div>
                                <p className="text-[#676E7E] font-[700] text-[1rem]">
                                  LAGOS
                                </p>
                                <p className="font-[700] text-[#1D2433] text-[1.5rem]">
                                  Eko Hotels & Suites
                                </p>
                                <span className="flex gap-[0.338rem]">
                                  <img src="/assets/Star.svg" alt="" />
                                  <span className="">4.0 (100)</span>
                                </span>
                              </div>

                              <IoIosArrowForward size={20} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </BCarouselItem>
              ))}{" "}
            </BCarouselContent>
          </SectionLayout>
        </div>{" "}
        <div>
          {" "}
          <div className="flex w-full justify-center my-4 mb-10 py-5">
            <div className="absolute -bottom-5 my-12">
              <div className="w-full flex flex-row space-x-2 items-center">
                <BCarouselPrevious className="border border-black">
                  <IoIosArrowBack size={20} color="black" />
                </BCarouselPrevious>
                {imageGallery?.map((image: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleChangeCarousel(index)}
                    className={`w-3 h-3 rounded-full ${index === current - 1 ? "bg-blue-500" : "bg-gray-300"}`}
                  ></button>
                ))}
                <BCarouselNext>
                  {" "}
                  <IoIosArrowForward size={20} />
                </BCarouselNext>
              </div>
            </div>
          </div>
        </div>
      </BCarousel>
    </div>
  );
};

export default FeaturedHotels;
