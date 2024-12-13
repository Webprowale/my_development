//@ts-nocheck
"use client";
import React, {
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useRef,
  Suspense,
} from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

import Modal from "../goui/modal";
import { Separator } from "../ui/separator";
import { Gallery } from "@/assets/icons";
import GoButton from "../goui/button";
import { useDropzone } from "react-dropzone";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/create-carousel";
import UploadForm from "./form";
import CreateAvatar from "./avatar";
import {
  CaretCircleLeft,
  CaretCircleRight,
  MinusSquare,
  Smiley,
  XCircle,
} from "@phosphor-icons/react";
import Tag from "./tag";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import ImageCropper from "./imageCropper";
import { Area } from "react-easy-crop";

const CreateModal = () => {
  const router = useRouter();
  const pathName = usePathname();

  const [open, setOpen] = useState(false);
  const [onTag, setOnTag] = useState(false);
  const [filePreviews, setFilePreviews] = useState<any>([]);
  // const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mentions, setMentions] = useState<any>([]);
  const [imgAfterCrop, setImgAfterCrop] = useState("");
  const [currentPage, setCurrentPage] = useState("choose-img");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuthStore((state) => ({ ...state })) as any;
  const { firstName, lastName, picture } = user;

  const onDrop = useCallback(
    async (files: File[]) => {
      const totalSize = files.reduce((acc, file) => acc + file.size, 0);
      const videoCount = files.filter((file) =>
        file.type.startsWith("video"),
      ).length;

      if (
        files.length + filePreviews.length > 10 ||
        totalSize > 15 * 1024 * 1024 ||
        videoCount > 1 ||
        files.some(
          (file) =>
            !file.type.startsWith("image/") && !file.type.startsWith("video/"),
        )
      ) {
        alert(
          "Please upload up to 9 images and 1 video with a total size not exceeding 15MB.",
        );
        return;
      }

      const validFiles = files.filter(
        (file) =>
          file.type.startsWith("image/") || file.type.startsWith("video/"),
      );

      const newPreviews: { preview: string; type: string }[] = validFiles.map(
        (file) => ({
          preview: URL.createObjectURL(file),
          type: file.type,
        }),
      );

      setFilePreviews((prevPreviews: any) => [...prevPreviews, ...newPreviews]);
      setMediaFiles((prevMediaFiles) => [...prevMediaFiles, ...validFiles]);
      setCurrentPage("crop-img");
    },
    [filePreviews],
  );

  const accept = {
    "image/*": ["jpg", "jpeg", "png", "gif"],
    "video/*": ["mp4", "mov", "avi", "mkv"],
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: true,
  });

  const mode = useSearchParams().get("mode");

  useEffect(() => {
    if (mode && pathName.startsWith("/gopal")) {
      setOpen(mode === "create");
    }
  }, [mode, pathName, router]);

  const onClose = () => {
    setOpen(false);
    router.push("/gopal");
  };

  if (!open) {
    return null;
  }

  // Add Media to Files
  const addMediaFiles = () => {
    console.log("Click outside Media", fileInputRef);
    if (fileInputRef.current) {
      console.log("Clicked inside Media");
      fileInputRef.current.click();
    }
  };

  const onCropDone = (imgCroppedArea: Area, image: any) => {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");

    let imageObj1 = new Image();

    imageObj1.src = image;

    imageObj1.onload = function () {
      context.drawImage(
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
    setImgAfterCrop(dataUrl);
    setCurrentPage("image-cropped");
  };

  const onCropCancel = () => {
    setFilePreviews([]);
    setCurrentPage("choose-img");
  };

  return (
    <Suspense>
      <>
        {currentPage === "crop-img" ? (
          <Modal
            isOpen={open}
            className="sm:max-w-[500px]"
            onClose={onClose}
            left={true}
            trigger={<p></p>}
          >
            <Carousel className="w-full h-[100vh - 200px] max-w-lg mx-auto">
              <CarouselContent className="w-full h-full">
                {filePreviews ? (
                  filePreviews.map((image: any, index: number) => {
                    const { preview, type } = image;
                    return (
                      <CarouselItem key={index} className="h-full">
                        <ImageCropper
                          image={preview}
                          onCropDone={onCropDone}
                          onCropCancel={onCropCancel}
                        />
                      </CarouselItem>
                    );
                  })
                ) : (
                  <CarouselItem>
                    <div>ola</div>
                  </CarouselItem>
                )}
              </CarouselContent>
            </Carousel>
          </Modal>
        ) : (
          <Modal isOpen={open} onClose={onClose} left={true} trigger={<p></p>}>
            <div className="w-full">
              {filePreviews.length > 0 ? null : (
                <>
                  <CreateAvatar firstName={firstName} lastName={lastName} />
                  <Separator className="h-[2px]" />
                </>
              )}
              <div
                {...getRootProps()}
                className={cn(
                  "flex justify-center items-center flex-col pt-4  relative",
                  filePreviews.length > 0 ? "hidden" : "",
                  isDragActive ? "bg-gray-50" : "",
                )}
              >
                <div className="p-3 bg-primary100 w-fit rounded-[4px]">
                  <Gallery className="w-6 h-6" />
                </div>
                {isDragActive ? (
                  <p className="pt-3 pb-2 font-medium md:text-sm text-xs">
                    Drop the media files here
                  </p>
                ) : (
                  <p className="pt-3 pb-2 font-medium md:text-sm text-xs">
                    Drag and drop your media file here or{" "}
                    <span className="text-primary600 cursor-pointer">
                      click here
                    </span>
                  </p>
                )}
                <input {...getInputProps()} ref={fileInputRef} />
              </div>

              {/*           
          <div className="h-fit">
            {filePreviews.length > 0 ? (
              <UploadForm
                setMentions={setMentions}
                mentions={mentions}
                mediaFiles={mediaFiles}
                filePreviews={filePreviews}
              />
            ) : null}
          </div>
          <div className="flex justify-center mt-5">
            {filePreviews.length > 0 ? (
              <div className="flex flex-col gap-y-10 ">
                <CarouselSize
                  filePreviews={filePreviews}
                  setFilePreviews={setFilePreviews}
                />
                <div className="flex justify-center">
                  <div className="flex items-center gap-4 p-2.5 px-3 bg-gray-200 border-sm">
                    <Tag />

                    <GoButton
                      onClick={addMediaFiles}
                      className="font-medium bg-primary200 border-primary200 text-primary600"
                    >
                      Add Media Files
                    </GoButton>
                  </div>
                </div>
              </div>
            ) : null}
          </div> */}
              {mentions.length ? (
                <div className="mt-10">
                  <ul className="flex justify-center items-center gap-3 flex-wrap">
                    {mentions.map((mention: any, index: number) => {
                      const { id, display } = mention as any;
                      return (
                        <li
                          key={index}
                          className="py-2 px-3 inline-flex items-center gap-2 bg-gray-100 rounded-sm border text-sm font-medium border-gray-300"
                        >
                          {display}

                          <MinusSquare weight="fill" color="red" size={19} />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </div>
          </Modal>
        )}
      </>
    </Suspense>
  );
};

export default CreateModal;

export const TriggerModal = () => <GoButton>LOL</GoButton>;

export function CarouselSize({
  filePreviews,
  setFilePreviews,
}: {
  filePreviews: any;
  setFilePreviews: Dispatch<SetStateAction<string[]>>;
}) {
  const removeImage = (indexToRemove: number) => {
    setFilePreviews((prevPreviews) =>
      prevPreviews.filter((_, index) => index !== indexToRemove),
    );
  };

  const switchImages = (indexA: number, indexB: number) => {
    const newFilePreviews = [...filePreviews];
    [newFilePreviews[indexA], newFilePreviews[indexB]] = [
      newFilePreviews[indexB],
      newFilePreviews[indexA],
    ];
    setFilePreviews(newFilePreviews);
  };

  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full h-full relative max-w-md mx-auto"
    >
      <CarouselContent className="w-full">
        {filePreviews.map((file: any, index: number) => {
          const { preview, type } = file;
          const isVideo = type.startsWith("video/");

          return (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 relative"
            >
              <div className="relative w-32 h-40">
                {isVideo ? (
                  <video
                    controls
                    className="object-cover rounded-sm h-full w-full"
                  >
                    <source src={preview} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={preview}
                    alt="nsin"
                    className="object-cover rounded-sm h-full w-full"
                  />
                )}
                <div className="absolute w-full h-full bg-black/20 inset-0"></div>
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1"
                >
                  <XCircle size={23} weight="fill" className="text-white" />
                </button>
                {index > 0 && (
                  <button
                    onClick={() => switchImages(index, index - 1)}
                    className="absolute bottom-1 left-1"
                  >
                    <CaretCircleLeft
                      size={23}
                      weight="fill"
                      className="text-white "
                    />
                  </button>
                )}
                {index < filePreviews.length - 1 && (
                  <button
                    onClick={() => switchImages(index, index + 1)}
                    className="absolute bottom-1 right-1"
                  >
                    <CaretCircleRight
                      size={23}
                      weight="fill"
                      className="text-white"
                    />
                  </button>
                )}
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="text-primary600 bg-primary100" />
      <CarouselNext className="text-primary600 bg-primary100" />
    </Carousel>
  );
}
