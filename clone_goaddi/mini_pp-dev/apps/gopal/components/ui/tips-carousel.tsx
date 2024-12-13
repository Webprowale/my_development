"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/trend-carousel";
import Autoplay from "embla-carousel-autoplay";

import SectionLayout from "./section-layout";
import { type CarouselApi } from "@/components/ui/carousel";
import Button from "../goui/button";
import { cn } from "@/lib/utils";

export interface ITip {
  icon: JSX.Element;
  title: string;
  content: string;
}
interface ITipsProps {
  tipsList: ITip[];
  sectionTitle: string;
  sectionSubtitle: string;
}

const Tips = ({ tipsList, sectionSubtitle, sectionTitle }: ITipsProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

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

  return (
    <SectionLayout
      title={sectionTitle}
      description={sectionSubtitle}
    >
      <Carousel
        opts={{
          loop: true,
          slidesToScroll: 2,
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        // @ts-ignore
        onMouseLeave={plugin.current.play}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent>
          {tipsList.map((tip: ITip, index) => {
            const { icon, title, content } = tip;

            return (
              <CarouselItem
                key={index}
                className="basis-1/2"
              >
                <Card className="">
                  {icon}

                  <h6 className="mt-3 text-lg font-bold">{title}</h6>

                  <p className="mt-2 text-sm">{content}</p>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* TODO: DOT NAVIGATION */}
        <div className="w-full p-5 centered mt-5">
          <div className="flex relative space-x-5">
            {[...new Array(count)].map((_, index) => (
              <button
                key={index}
                onClick={() => handleChangeCarousel(index)}
                className={cn(
                  "rounded w-2 h-2",
                  index === current - 1 ? "bg-neutral-900" : "bg-neutral-300",
                )}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </SectionLayout>
  );
};

export default Tips;
