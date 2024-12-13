"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/post-carousel";
import { useState, useEffect } from "react";
import { getFileExtension } from "@/utils";
import Video from "@/components/goui/video";

type ImageProps = {
  id: ImageProps;
  url: string;
};

const DiaryPostImages = ({ images }: { images: any }) => {
  console.log("diaary images", images);
  return (
    <div className="grid grid-cols-2 gap-3">
      {images &&
        images?.slice(0, 4).map((image: any, index: number) => {
          const { url } = image;

          const ext = getFileExtension(image.url);
          return (
            <div
              key={index}
              className={` ${
                images.length === 3 && index === 2
                  ? "col-start-2 col-end-3 row-start-1 row-end-3"
                  : ""
              }
            ${
              images.length === 1
                ? "col-start-1 col-end-3 row-start-1 row-end-3"
                : ""
            }
            `}
            >
              <AspectRatio
                ratio={
                  images.length === 3 && index === 2
                    ? 6 / 7
                    : images.length === 2
                      ? 4 / 5
                      : 16 / 9
                }
                className={`bg-muted relative h-full`}
              >
                {url && (
                  <Image
                    src={url === "hello" ? "" : url}
                    alt="post image"
                    fill
                    className={`rounded-[4px] object-cover object-top`}
                  />
                )}

                {images.length > 4 && index === 3 && (
                  <div className="text-4 absolute top-0 right-0 bg-slate-600/70 w-full h-full rounded-[4px]">
                    <p className="md:text-4xl text-3xl h-full text-white flex justify-center items-center">
                      +{images.length - 4}
                    </p>
                  </div>
                )}
              </AspectRatio>
            </div>
          );
        })}
    </div>
  );
};

export default DiaryPostImages;

export const PostImages = ({ images }: { images: any }) => {
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
      // console.log("current");
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // console.log(images);

  return (
    <div className="rounded-sm relative">
      <Carousel setApi={setApi} className="w-full rounded-sm relative">
        <CarouselContent className="bg-white">
          {images &&
            images?.map((image: any) => {
              // const { id, url } = image;

              const ext = getFileExtension(image.url);
              return (
                <CarouselItem
                  key={image.url}
                  className="flex justify-center max-h-[4s00px] items-center bg-gray-100/70"
                >
                  {/* <AspectRatio
                    ratio={4 / 5}
                    className={`bg-muted relative h-full`}
                  > */}
                  {ext === "mp4" ? (
                    <Video src={image.url} />
                  ) : (
                    <img
                      src={image.url}
                      alt=""
                      className={`rounded-[4px] w-full object-cover max-h-[500px] object-top`}
                    />
                  )}
                  {/* </AspectRatio> */}
                </CarouselItem>
              );
            })}
        </CarouselContent>
        {!images.length ? (
          <>
            {/* Next & Previous Button */}

            <div className="flex absolute bottom-5 left-0 right-0 justify-center ">
              <div className="flex md:gap-8 gap-6 bg-white/20 backdrop-blur-md px-2 py-px rounded-sm">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </div>
            {/* Indicator */}
            <div className="absolute top-4 right-5">
              <p className="bg-slate-900/30 backdrop-blur-sm px-3 py-1 text-white rounded-sm">
                {current} / {count}
              </p>
            </div>
          </>
        ) : null}
      </Carousel>
    </div>
  );
};
