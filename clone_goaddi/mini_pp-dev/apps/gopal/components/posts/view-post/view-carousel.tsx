"use client";
import { XCircle } from "@phosphor-icons/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import Video from "@/components/goui/video";
import { getFileExtension } from "@/utils";

type Props = {
  images?: any;
  onClose?: () => void;
};

const ViewCarousel = ({ images, onClose }: Props) => {
  // console.log("Image", images);

  return (
    <div className="relative w-full h-full">
      <button
        onClick={onClose}
        className="absolute left-5 top-3 cursor-pointer"
      >
        <XCircle size={28} weight="fill" className="text-white " />
      </button>

      <div className="flex justify-center items-center h-full">
        <Carousel className="w-full max-w-2xl h-screen ">
          <CarouselContent className="h-full">
            {images?.map((image: any, index: number) => {
              const ext = getFileExtension(image.url);

              return (
                <CarouselItem key={index} className="h-screen">
                  <div className="relative flex justify-center items-center w-full h-full">
                    {ext === "mp4" ? (
                      <Video src={image.url} />
                    ) : (
                      <Image
                        width={800}
                        height={800}
                        src={image?.url}
                        alt="Post"
                        sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 100vw,
                           350vw"
                        className="h-auto w-auto  flex justify-center items-center"
                      />
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {images?.length > 1 ? (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          ) : null}
        </Carousel>
      </div>
    </div>
  );
};

export default ViewCarousel;
