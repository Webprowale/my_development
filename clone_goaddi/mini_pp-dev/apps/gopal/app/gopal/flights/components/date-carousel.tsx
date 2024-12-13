"use client"
import * as React from "react"


import
{
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselNext,
      CarouselPrevious,
} from "@/components/ui/carousel"
import { Flex } from "@/components/ui/flex"
import { Icons } from "@/components/icons"
import { useState } from "react"
import { IoIosArrowForward } from "react-icons/io"
import { CaretLeft } from "@phosphor-icons/react/dist/ssr/CaretLeft"
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight"

export default function DateCarousel()
{
      return (
            <div className="bg-white centered p-6">
                  <Carousel
                        opts={{
                              align: "start",
                        }}
                        className="w-full sm: max-w-[576px] md:max-w-[978px] lg:max-w-[1044px]"
                  >
                        <CarouselContent className="-ml-2">
                              {Array.from({ length: 15 }).map((_, index) => (
                                    <CarouselItem key={index} className="pl-2 basis-[150px]">
                                          <PriceCard />
                                    </CarouselItem>
                              ))}
                        </CarouselContent>
                        
                        <CarouselPrevious className="border-none" icon={<CaretLeft size={32} />}/>
                        <CarouselNext className="border-none" icon={<CaretRight size={32} />}/>
                  </Carousel>
            </div>

      )
}

function PriceCard()
{
      const [revealPrice, setRevealPrice] = useState<boolean>(false)

      return (
            <Flex onClick={() => setRevealPrice(!revealPrice)} col gap={3} className="group cursor-pointer p-5 py-4 border border-neutral-300 rounded hover:border-primary">
                  <p className="text-text font-medium text-sm group-hover:text-primary">
                        Apr 12 - Apr 21
                  </p>



                  {revealPrice ? <Flex className="">
                        <Icons.nairaBlue />
                        <h1 className="font-semibold text-primary">1,193,383.00</h1>
                  </Flex> : <p className="text-text-secondary font-medium text-sm group-hover:text-primary top-y-0 transition-all">
                        view
                  </p>}

            </Flex>
      )
}