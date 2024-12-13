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
import Image from "next/image";
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
  Trash,
  XCircle,
} from "@phosphor-icons/react";
import Tag from "./tag";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { ArrowLeft, Dot, Pen } from "@phosphor-icons/react/dist/ssr";
import { Flex } from "../ui/flex";
import Paragraph from "../ui/typography/paragraph";
import EditImageModal from "./edit-image-modal";
import { IPostImage } from "./add-media-to-post";
import { MediaFilesSchema } from "@/store/useCreatePostStore";

const CreateModal = () => {
  const router = useRouter();
  const pathName = usePathname();

  const [open, setOpen] = useState(false);
  const [onTag, setOnTag] = useState(false);
  const [filePreviews, setFilePreviews] = useState<any>([]);
  const [mediaFiles, setMediaFiles] = useState<MediaFilesSchema[]>([]);
  const [mentions, setMentions] = useState<any>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user, setUser } = useAuthStore((state) => ({ ...state })) as any;
  const { firstName, lastName, picture } = user;

  // mock logged in user
  // useEffect(() => {
  //   setUser({
  //     firstName: "bobby",
  //     lastName: "dev",
  //   });
  // }, []);

  const onDrop = useCallback(
    async (files: File[]) => {
      const totalSize = files.reduce((acc, file) => acc + file.size, 0);
      const videoCount = files.filter((file) =>
        file.type.startsWith("video"),
      ).length;

      // Check if the total number of files exceeds 10, or if the total size exceeds 15MB,
      // or if more than 1 video is uploaded, or if any file is not an image or video
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

      // Filter out files that are neither images nor videos
      const validFiles = files.filter(
        (file) =>
          file.type.startsWith("image/") || file.type.startsWith("video/"),
      );

      // Convert valid files to previews along with their types
      const newPreviews: { preview: string; type: string }[] = validFiles.map(
        (file) => ({
          preview: URL.createObjectURL(file),
          type: file.type,
        }),
      );

      // Update previews and media files state
      // setFilePreviews((prevPreviews: any) => [...prevPreviews, ...newPreviews]);
      // setMediaFiles((prevMediaFiles) => [...prevMediaFiles, ...validFiles]);
    },
    [filePreviews],
  );

  const accept = {
    "image/*": [".jpg", ".jpeg", ".png", ".gif"],
    "video/*": [".mp4", ".mov", ".avi", ".mkv"],
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

  return (
    <Suspense>
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
              isDragActive
                ? "bg-gray-50 border-2  border-dashed border-gray-100"
                : "",
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
                  diary={false}
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
          </div>

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
    </Suspense>
  );
};

export default CreateModal;

export const TriggerModal = () => <GoButton>LOL</GoButton>;

export function CarouselSize({
  setExistingImages,
  filePreviews,
  setFilePreviews,
  diary,
  coverImageIndex, // Include coverImage prop
  setCoverImage,
  setCoverImageIndex, // Include setCoverImage prop
}: {
  setExistingImages?: Dispatch<any>;
  coverImageIndex?: number;
  setCoverImage?: React.Dispatch<React.SetStateAction<File[]>>; // Make setCoverImage optional
  diary?: boolean;
  filePreviews: any;
  setFilePreviews: Dispatch<SetStateAction<string[]>>;
  setCoverImageIndex?: Dispatch<SetStateAction<number>>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentSelectedImage, setCurrentSelectedImage] = useState<any>([]);
  const [croppedImagge, setCroppedImage] = useState("");

  const removeImage = (indexToRemove: number) => {
    setFilePreviews((prevPreviews) =>
      prevPreviews.filter((_, index) => index !== indexToRemove),
    );
    if (setExistingImages) {
      return setExistingImages((prevPreviews: any) =>
        prevPreviews.filter((_: any, index: any) => index !== indexToRemove),
      );
    }
  };

  const switchImages = (indexA: number, indexB: number) => {
    const newFilePreviews = [...filePreviews];
    [newFilePreviews[indexA], newFilePreviews[indexB]] = [
      newFilePreviews[indexB],
      newFilePreviews[indexA],
    ];
    setFilePreviews(newFilePreviews);
  };

  const handleEditImage = (selectedImage: File) => {
    setIsEditing(true);
    setCurrentSelectedImage(selectedImage);
  };

  const onEditDone = (processedImage?: File | string) => {
    setCroppedImage(processedImage as string);
    console.log(processedImage);

    setIsEditing(false);
    // setCurrentSelectedImage(selectedImage)
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
              className={` md:basis-full ${filePreviews.length === 2 && "lg:basis-1/2"} ${filePreviews.length >= 3 && "lg:basis-1/3"} relative`}
            >
              <div className="relative w-auto h-40 group">
                {isVideo ? (
                  <video controls className="object-cover rounded-sm">
                    <source src={preview} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={preview}
                    alt="nsin"
                    className="object-cover rounded-xl h-full w-full"
                  />
                )}
                <div className="absolute group-hover:visible invisible rounded-xl w-full h-full bg-black/30 top-0 left-0  inset-0 z-10 transition-all centered ">
                  <Flex gap={1} className="absolute top-0 left-0 w-full p-2">
                    <Pen
                      role="button"
                      onClick={() => handleEditImage(preview)}
                      size={20}
                      className="text-white"
                    />
                    <Trash
                      role="button"
                      onClick={() => removeImage(index)}
                      size={20}
                      className="text-white"
                    />
                  </Flex>

                  {/* <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1"
                >
                  <XCircle size={23} weight="fill" className="text-white" />
                </button> */}

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

                {diary && setCoverImageIndex && (
                  <button
                    onClick={() => {
                      setCoverImageIndex(index);
                    }}
                    className="z-50 absolute top-1 left-1 p-1 gap-[4px] rounded text-white bg-[#FFFFFF33] text-[8px] font-bold  backdrop-blur-md flex justify-start items-center"
                  >
                    <span
                      className={`w-[12px] h-[12px] rounded-full border-1 border-[#344054] ${coverImageIndex === index ? "bg-[#0D6EFD] " : "bg-white"} flex justify-center items-center relative`}
                    >
                      <p className="text-white text-[40px] pb-[1.65rem] ">.</p>
                      {/* <Dot size={18} color="#FFFFFF" /> */}
                    </span>
                    Select as cover
                  </button>
                )}

                <EditImageModal
                  onEditDone={onEditDone}
                  open={isEditing}
                  onOpenChange={setIsEditing}
                  onClose={onEditDone}
                  imageFile={currentSelectedImage}
                />
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      {/* <div className="absolute -bottom-4 flex gap-3 items-center left-1/2 -translate-x-1/2"> */}
      <CarouselPrevious className="text-primary600 bg-primary100" />
      <CarouselNext className="text-primary600 bg-primary100" />
      {/* </div> */}
    </Carousel>
  );
}

// interface IEditImageModal
// {
//   imageFile?: File,
//   open: boolean,
//   onClose: () => void
// }
// function EditImageModal({ imageFile, open, onClose }: IEditImageModal)
// {
//   const [onTag, setOnTag] = useState(false);
//   const [_, setOpen] = useState(true);

//   // const onClose = () =>
//   // {
//   //   // setOpen(false);
//   //   // router.push("/gopal");
//   // };

//   return (
//     <Modal isOpen={open} onClose={onClose} left={true} trigger={<p></p>}>
//       <div className="bg-text max-w-[500px] w-full h-[400px]">
//         <Flex between className="bg-primary">
//           <ArrowLeft size={32} color="#321c9b" />

//           <Paragraph>Crop</Paragraph>

//           <Paragraph>Done</Paragraph>
//         </Flex>

//         <div className="image_box overflow-hidden w-full h-full relative">
//           <Image
//             src={imageFile}
//             alt="nsin"
//             className="object-cover rounded-xl h-full w-full"
//             fill
//           />
//         </div>

//       </div>
//     </Modal>
//   )
// }
