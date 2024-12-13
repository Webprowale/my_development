//@ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Paragraph from "@/components/ui/typography/paragraph";
import Head1 from "@/components/ui/typography/Head1";
import { Flex } from "../ui/flex";
import { ArrowLeft, Dot, Pen } from "@phosphor-icons/react/dist/ssr";
import Cropper from "react-easy-crop";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "../ui/separator";

interface IEditImageModal {
  imageFile?: File;
  open: boolean;
  onClose: () => void;
  onEditDone: (processedImage: string) => void;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function EditImageModal({
  imageFile,
  open,
  onClose,
  onOpenChange,
  onEditDone,
}: IEditImageModal) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const [croppedArea, setCroppedArea] = useState(null);

  function handleCancle() {
    onClose();
  }


  function handleDone(imgCroppedArea: any) {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");

    let imageObj1 = new Image();

    imageObj1.src = imageFile;

    imageObj1.onload = function () {
      context?.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height,
      );
    };

    const dataUrl = canvasEle.toDataURL("image/jpeg");
    onEditDone(dataUrl);
  }

  function onAspectRatioSelect(event: any) {
    setAspectRatio(event.target.value);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent noCloseBtn={true} className="p-0 h-[540px]">
        <div className="bg-text w-full h-auto flex flex-col relative">
          <Flex between className="bg-primary px-4 p-2 rounded-t-sm ">
            <button onClick={handleCancle}>
              <ArrowLeft size={23} className="text-white" />
            </button>

            <Paragraph className="text-white">Crop</Paragraph>
            <button
              onClick={() => handleDone(croppedArea)}
              className="text-white"
            >
              Done
            </button>
          </Flex>

          <div className="image_box  w-full h-full relative">
            <img
              src={imageFile}
              alt="nsin"
              className="object-cover h-full max-h-[360px] w-full"
            />

            <Cropper
              image={imageFile}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={setCroppedArea}
              style={{
                containerStyle: {
                  width: "100%",
                  height: "70%",
                },
              }}
            />

            <div className="w-full absolute bottom-0 bg-white left-0 p-3 text-neutral-500 space-y-2">
              <Flex col gap={2} className="items-start">
                <Paragraph className="text-sm text-neutral-500">
                  Aspect ratio
                </Paragraph>
                <Flex
                  onChange={onAspectRatioSelect}
                  gap={2}
                  className="text-sm text-neutral-500"
                >
                  <input type="radio" name="ratio" value={1 / 1} id="" />
                  1/1
                  <input type="radio" name="ratio" value={5 / 4} id="" />
                  5/4
                  <input type="radio" name="ratio" value={4 / 3} id="" />
                  4/3
                  <input type="radio" name="ratio" value={3 / 2} id="" />
                  3/2
                  <input type="radio" name="ratio" value={5 / 3} id="" />
                  5/3
                  <input type="radio" name="ratio" value={16 / 9} id="" />
                  16/9
                </Flex>
              </Flex>

              <Separator />

              <Flex col gap={2} className="items-start">
                <Paragraph className="text-sm">Zoom {zoom}%</Paragraph>
                <input
                  type="range"
                  name=""
                  onChange={(e) => setZoom(Number(e.target.value))}
                  min={1}
                  max={10}
                  id=""
                />
              </Flex>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


