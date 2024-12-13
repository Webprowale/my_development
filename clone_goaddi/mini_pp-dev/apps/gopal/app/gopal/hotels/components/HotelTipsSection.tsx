import { useEffect, useRef, useState } from "react";
import SectionLayout from "../../activities/components/section";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel as BCarousel,
  CarouselApi as BCarouselApi,
  CarouselContent as BCarouselContent,
  CarouselItem as BCarouselItem,
  CarouselNext as BCarouselNext,
  CarouselPrevious as BCarouselPrevious,
} from "@/components/ui/carousel";
import {
  AirplaneInFlight,
  SuitcaseRolling,
} from "@phosphor-icons/react/dist/ssr";
const HotelTipsSection = () => {
  const [current, setCurrent] = useState(3);
  const [api, setApi] = useState<BCarouselApi>();

  const Gallery = [1, 2, 3];
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
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const hotelTips = [
    {
      icon: <SuitcaseRolling size={24} />,
      title: "Hotel Stay Packing Tips",
      desc: "To ensure a comfortable and convenient hotel stay, pack a change of clothes and essentials in your luggage, download entertainment for your device, bring a reusable water bottle to stay hydrated, pack healthy snacks, and bring items to help you relax like a book, headphones, sleep mask, and earplugs.",
    },
    {
      icon: <AirplaneInFlight size={24} />,
      title: "Hotel Room Comfort",
      desc: "To enhance your hotel experience and ensure a good night's sleep, adjust the room temperature to your preference, keep the lighting dim for relaxation, use the provided amenities for self-care, practice mindfulness or light stretching, and don't forget to stay hydrated by drinking water regularly.",
    },
    {
      icon: <SuitcaseRolling size={24} />,
      title: "Travel Essentials Checklist",
      desc: "To be comfortable and prepared for your flight, pack a change of clothes and essentials in your carry-on, download entertainment for your device, bring a reusable water bottle fill after security, pack healthy snacks, and bring items   to help you pass the time like a book, headphones, eye mask, and earplugs.",
    },
    {
      icon: <SuitcaseRolling size={24} />,
      title: "  Carry-on Packing Tips",
      desc: "To be comfortable and prepared for your flight, pack a change of clothes and essentials in your carry-on, download entertainment for your device, bring a reusable water bottle fill after security, pack healthy snacks, and bring items   to help you pass the time like a book, headphones, eye mask, and earplugs.",
    },
    {
      icon: <SuitcaseRolling size={24} />,
      title: "  Carry-on Packing Tips",
      desc: "To be comfortable and prepared for your flight, pack a change of clothes and essentials in your carry-on, download entertainment for your device, bring a reusable water bottle fill after security, pack healthy snacks, and bring items   to help you pass the time like a book, headphones, eye mask, and earplugs.",
    },
    {
      icon: <SuitcaseRolling size={24} />,
      title: "  Carry-on Packing Tips",
      desc: "To be comfortable and prepared for your flight, pack a change of clothes and essentials in your carry-on, download entertainment for your device, bring a reusable water bottle fill after security, pack healthy snacks, and bring items   to help you pass the time like a book, headphones, eye mask, and earplugs.",
    },
  ];
  return (
    <SectionLayout
      title="Hotel Tips"
      description="Make the most of your hotel experience 💡"
    >
      {" "}
      <BCarousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        setApi={setApi}
        className=""
      >
        <BCarouselContent>
          {Gallery?.map((image: any, index: number) => (
            <BCarouselItem key={index} className=" transition-all duration-300">
              <div className="flex flex-col gap-[1.125rem] md:flex-row">
                {hotelTips.slice(index * 2, index * 2 + 2).map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="border-[1px] border-[#D0D5DD] rounded-[6px] p-[1.5rem]"
                    >
                      <div>{item?.icon}</div>
                      <h2 className="mt-[1rem] mb-[0.625rem] text-[#1D2433] font-[700] text-[1.25rem]">
                        {item?.title}
                      </h2>
                      <p>{item?.desc}</p>
                    </div>
                  );
                })}
              </div>
            </BCarouselItem>
          ))}{" "}
        </BCarouselContent>
        <div className="flex w-full justify-center mt-6 pt-10">
          <div className="absolute -bottom-5 my-12">
            <div className="w-full flex flex-row space-x-2 items-center">
              {Gallery?.map((image: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleChangeCarousel(index)}
                  className={`w-2 h-2 rounded-full ${index === current - 1 ? "bg-[#344054]" : "bg-gray-300"}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </BCarousel>
    </SectionLayout>
  );
};

export default HotelTipsSection;
