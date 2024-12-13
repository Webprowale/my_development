"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import
{
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/trend-carousel";
import Autoplay from "embla-carousel-autoplay";

import { useCarousel, type CarouselApi } from "@/components/ui/carousel"
import { cn } from "@/lib/utils";
import { MediaFilesSchema, useCreatePostStore } from "@/store/useCreatePostStore";
import Image from 'next/image'
import ImageCropper from "./ImageCropper";
import { ArrowsOutSimple, CaretLeft, CaretRight } from "@phosphor-icons/react";





interface IPreviewSelectedFiles
{
  handleCloseEditorForce?: any;
}

const PreviewSelectedFiles = ({ handleCloseEditorForce }: IPreviewSelectedFiles) =>
{
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const { selectedMediaFiles, setSelectedMediaFiles, setProcessedMediaFiles } = useCreatePostStore((state) => ({ ...state }))
  const [openCropper, setOpenCropper] = useState(false);


  useEffect(() =>
  {
    if (!api)
    {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () =>
    {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  function handleDoneEditing()
  {
    handleCloseEditorForce()
    setProcessedMediaFiles(selectedMediaFiles)
    setSelectedMediaFiles([])

  }

  function handleApplyCrop()
  {
    setProcessedMediaFiles(selectedMediaFiles)
    setSelectedMediaFiles([])

  }




  return (
      <Carousel
        opts={{
          align: "center",
        }}
        className="preview_and_edit h-full w-full bg-black"
      >
        <CarouselContent className="border border-yellow-400 h-[90%]">
          {selectedMediaFiles.map((file: MediaFilesSchema, index: number) =>
          {
            const { preview, type } = file;
            const isVideo = type?.startsWith("video/");

            return (
              <PreviewItem key={index} file={file} />
            );
          })}



        </CarouselContent>
          
                <div className="w-full flex  justify-between  h-[10%] br">
                {/* <PreviewControls/> */}


        <button onClick={handleCloseEditorForce} className="text-white p-2 hove:bg-white/50">
          Cancel
        </button>
        <button onClick={handleDoneEditing} className="text-white p-2 hove:bg-white/50">
          Next
        </button>
        </div>
      </Carousel>  
  );
};

export default PreviewSelectedFiles;


interface IPreviewItem
{
  file: MediaFilesSchema
}

function PreviewItem({ file, ...props }: IPreviewItem)
{
  const [openCropper, setOpenCropper] = useState(false);


  function handleImageCropper()
  {
    setOpenCropper(true)
    console.log("done this");

  }

  return (

    <CarouselItem
      {...props}
      className={``}
    >
      <div className="group relative p-5 flex flex-col br">
        <div style={{
          backgroundImage: `url(${file.preview})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }} className="image_frame h-[420px]" />

        <div className="absolute top-4 p-2 left-4">
          <ArrowsOutSimple
            role="button"
            onClick={handleImageCropper}
            size={20}
            className="text-white"
          />
        </div>

      </div>

      <ImageCropper open={true} currentImage={file.preview} />
    </CarouselItem>
  )
}



