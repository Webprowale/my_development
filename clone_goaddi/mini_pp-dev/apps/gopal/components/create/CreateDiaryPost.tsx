import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { Gallery } from "@/assets/icons";
import { useDropzone } from "react-dropzone";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import GoButton from "../goui/button";
import {
  CheckSquareOffset,
  GlobeHemisphereWest,
  Lock,
  MagnifyingGlass,
  MapPin,
  Tag,
  XCircle,
} from "@phosphor-icons/react/dist/ssr";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { useAuthStore } from "@/store/useAuthStore";
import { getInitials } from "@/utils";
import { toast } from "sonner";
import axios from "axios";
import Modal from "../goui/modal";
import { C_Button } from "@/app/gopal/profile/[id]/button";
import { FaPlus } from "react-icons/fa6";
import {
  CreateDiaryPoster,
  UpdateDairy,
} from "@/axios/endpoints/diary.endpoints";
import { useDairyStore } from "@/store/useDiaryStore";
import { CarouselSize } from "./createModal";

type Props = {
  icon: ReactElement;
  text: string;
  isOpen?: boolean;
  onClose?: any;
  diary?: any;
};

const formSchema = z.object({
  diary_title: z.string().min(2).max(50),
  diary_description: z.string().min(2).max(50),
});

type Privacy = {
  name: string;
  desc: string;
  icon: ReactElement;
};

export function CreateDiary({ icon, text, isOpen, onClose, diary }: Props) {
  const { user } = useAuthStore((state) => ({ ...state })) as any;
  const { firstName, lastName, picture, userId } = user;
  // console.log(user);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // console.log("diary", diary);

  const router = useRouter();
  const pathName = usePathname();
  const mode = useSearchParams().get("mode");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onTag, setOnTag] = useState(false);
  const [filePreviews, setFilePreviews] = useState<any>([]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaLinks, setMediaLinks] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<any>([]);
  const [mentions, setMentions] = useState<any>([]);
  const [showLocation, setShowLocation] = useState<boolean>(false);
  const [locations, setLocations] = useState<any>([]);
  const [coverImage, setCoverImage] = useState<File[]>([]);
  const [coverImageIndex, setCoverImageIndex] = useState<number>(0);
  const [Loading, setLoading] = useState<boolean>(false);
  const [privacy, setPrivacy] = useState<Privacy>({
    name: "Public",
    desc: "",
    icon: icon,
  });
  const { status, message, data, fetchDairyPosts, loading } = useDairyStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      diary_title: "",
      diary_description: "",
    },
    values: {
      diary_title: diary?.title,
      diary_description: diary?.description,
    },
  });
  useEffect(() => {
    if (diary && diary.files) {
      setFilePreviews(
        diary.files.map((item: any) => {
          const fileType = /\.(jpg|jpeg|png|gif)$/i.test(item.url)
            ? "image"
            : "video";
          return {
            preview: item.url,
            type: fileType,
          };
        }),
      );
      setExistingImages(diary.files.map((item: any) => item?.url));
    }
  }, [diary]);

  function FIlterLocation() {
    // cities
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const loadingId = toast.loading("Uploading media");
    // Log form values
    // console.log("Form values:", values);
    // Log privacy name, coverImage, and filePreviews
    // console.log(mediaFiles);

    // Set loading state to true
    setLoading(true);

    try {
      if (!mediaFiles && !diary) {
        return;
      }

      const data = {
        title: values?.diary_title,
        description: values?.diary_description,
        cover: mediaFiles[coverImageIndex],
        private: privacy?.name,
        files: mediaFiles,
      };

      const formData = new FormData();
      for (let i = 0; i < mediaFiles.length; i++) {
        formData.append(`file${i}`, mediaFiles[i]);
      }
      // Uploading Post
      const filesresponse = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const links = filesresponse?.data?.data;
      // console.log("Upload Data", data);

      let NewarrayOfFilesString = [];

      const arrayOfFilesString = links?.map(
        (obj: { file: string }) => obj.file,
      );

      if (diary) {
        NewarrayOfFilesString = [...existingImages, ...arrayOfFilesString];
        // console.log(NewarrayOfFilesString);
      } else {
        NewarrayOfFilesString = arrayOfFilesString;
      }

      setMediaLinks(NewarrayOfFilesString);

      // console.log("Array Of Strings", NewarrayOfFilesString);

      const toastM = diary ? "Updating post" : "Creating post";
      //Creating Post
      toast.loading(toastM, {
        id: loadingId,
      });
      if (diary) {
        const { status } = await UpdateDairy({
          id: diary.id,
          title: values?.diary_title,
          description: values?.diary_description,
          files: NewarrayOfFilesString,
          private: privacy?.name,
          cover: NewarrayOfFilesString[coverImageIndex],
        });
      } else {
        const { status } = await CreateDiaryPoster({
          title: values?.diary_title,
          description: values?.diary_description,
          files: NewarrayOfFilesString,
          private: privacy?.name,
          cover: NewarrayOfFilesString[coverImageIndex],
        });
        // Handle response accordingly
        if (status === true) {
          const toastMessage = diary
            ? "Diary Updated successfully"
            : "Diary Created successfully";
          toast.success(toastMessage, { id: loadingId });
          onClose();
          router.push(`/gopal/profile/${userId}?tab=diary`);
          form.reset();
          setMediaFiles([]);
          setMediaLinks([]);
          setFilePreviews([]);
          fetchDairyPosts();
        }
      }
    } catch (error) {
      // Log and handle error
      console.error("Error:", error);
      toast.error("An error occurred", {
        description: "There was an error processing your request.",
        duration: 5000,
      });
    } finally {
      // Set loading state to false
      setLoading(false);
    }
  }

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
      setFilePreviews((prevPreviews: any) => [...prevPreviews, ...newPreviews]);
      setMediaFiles((prevMediaFiles) => [...prevMediaFiles, ...validFiles]);
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
  // Add Media to Files
  const addMediaFiles = () => {
    if (fileInputRef.current) {
      console.log("here");
      fileInputRef.current.click();
    }
  };

  const TitleCount = form?.watch("diary_title")?.length;
  const DescriptionCount = form?.watch("diary_description")?.length;

  return (
    <div className="sm:max-w-[900px]  my-2">
      {!diary && filePreviews?.length < 1 && (
        <div {...getRootProps()}>
          <DialogHeader>
            <DialogTitle className="flex justify-start items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={picture}
                  alt={firstName}
                  className="w-[30px] h-[30px] rounded-full"
                />
                <AvatarFallback>
                  {" "}
                  {getInitials(`${firstName} ${lastName}`)}
                </AvatarFallback>
              </Avatar>
              <p className="">Share your experience with the world</p>
            </DialogTitle>
          </DialogHeader>
          <Separator className="my-4" />
          <div className="flex flex-col justify-center items-center">
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
        </div>
      )}

      <div className="relative">
        {(filePreviews?.length > 0 || diary) && (
          <div>
            <div className="flex justify-between w-full items-center">
              <div className="flex justify-start items-center gap-4">
                <Avatar className="md:w-14 md:h-14 w-10 h-10 cursor-pointer">
                  <AvatarImage src={picture} />
                  <AvatarFallback>
                    {getInitials(`${firstName} ${lastName}`)}
                  </AvatarFallback>
                </Avatar>
                <span className="flex flex-col gap-2">
                  <p>
                    {firstName} {lastName}
                  </p>
                  <Select onValueChange={(e: any) => setPrivacy(e)}>
                    <SelectTrigger className="w-[115px] h-[40px]  bg-[#F0F2F5] rounded p-2 flex">
                      {/* <GlobeHemisphereWest size={16} /> */}
                      <SelectValue placeholder="Public" className="">
                        <div className="flex justify-start items-center gap-2">
                          {" "}
                          {privacy?.icon} {privacy?.name}
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {dropData.map((item: any, i: number) => (
                        <SelectItem
                          key={i}
                          value={item}
                          className=" hover:bg-gray-100 p-2 line-clamp-1"
                        >
                          <div className="flex gap-2 justify-start items-center">
                            <div className="">{item?.icon}</div>
                            <div className="flex flex-col gap-2">
                              <p className="font-semibold text-sm">
                                {item?.name}
                              </p>
                              <p className="text-xs text-gray-600">
                                {item?.desc}
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </span>
              </div>

              <button
                onClick={form.handleSubmit(onSubmit)} // Pass the onSubmit function to handleSubmit                  type="submit"
                className="bg-primary600 text-white rounded-sm px-8 py-[8px] md:text-xs text-xs h-fit w-fit hover:text-primary600 hover:bg-white border border-primary600 hover:border-primary600"
              >
                {/* {Loading ? "Loading..." : "Post "}  */}
                Post
              </button>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-4"
              >
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="diary_title"
                    render={({ field }) => (
                      <FormItem>
                        <div className="w-full flex justify-between items-center">
                          {" "}
                          <FormLabel className="text-[16px] font-normal leading-[24px] tracking-[-0.5px] text-[#1D2433]">
                            Diary title
                          </FormLabel>{" "}
                          <p className="text-[#676E7E] text-[12px] leading-[22px] tracking-[-0.5px] font-medium">
                            {TitleCount > 0 ? TitleCount : 0}
                          </p>
                        </div>

                        <FormControl>
                          <Input
                            className="rounded border border-[#98A2B3]"
                            placeholder="Enter diary title"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="diary_description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="w-full flex justify-between items-center">
                        {" "}
                        <FormLabel className="text-[16px] font-normal leading-[24px] tracking-[-0.5px] text-[#1D2433]">
                          Diary description
                        </FormLabel>
                        <p className="text-[#676E7E] text-[12px] leading-[22px] tracking-[-0.5px] font-medium">
                          {DescriptionCount > 0 ? DescriptionCount : 0}
                        </p>
                      </div>

                      <FormControl>
                        <Textarea
                          className="rounded border border-[#98A2B3]"
                          placeholder="Enter diary description"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        )}
      </div>
      {showLocation && (
        <div className="z-50 p-4 bg-white w-[80%] mx-auto absolute bottom-5 inset-x-0 h-[445px] rounded shadow-lg">
          <div className="flex justify-between items-center mb-4">
            {" "}
            <p>Tag Location</p>{" "}
            <XCircle size={20} onClick={() => setShowLocation(false)} />
          </div>

          <div className="flex justify-start items-center rounded p-4 bg-[#F0F2F5] text-[#676E7E] h-[46px]">
            <MagnifyingGlass size={15} />{" "}
            <Input
              placeholder="search"
              className="bg-transparent border-none border-0"
            />
          </div>

          {locations.length > 0 && (
            <div>
              {locations.map((location: any, i: number) => (
                <div key={i}>
                  <span className="w-[42px] h-[42px] rounded bg-[#E7F0FF]">
                    <MapPin size={20} color="#0D6EFD" />
                  </span>
                </div>
              ))}{" "}
            </div>
          )}
        </div>
      )}
      <div className="flex justify-center mt-5">
        {filePreviews?.length > 0 ? (
          <div className="flex flex-col gap-y-10 ">
            <CarouselSize
              diary={true}
              filePreviews={filePreviews}
              setFilePreviews={setFilePreviews}
              setCoverImage={setCoverImage}
              coverImageIndex={coverImageIndex}
              setCoverImageIndex={setCoverImageIndex}
              setExistingImages={setExistingImages}
            />
          </div>
        ) : null}
      </div>
      {TitleCount && DescriptionCount && (
        <div className="flex justify-center mt-5">
          <div className="flex items-center gap-4 p-2.5 px-3 bg-gray-200 border-sm">
            <div
              // onClick={() => setShowLocation(true)}
              className="cursor-pointer "
            >
              {" "}
              <MapPin />
            </div>

            <GoButton
              onClick={addMediaFiles}
              className="font-medium bg-primary200 border-primary200 text-primary600"
            >
              <input {...getInputProps()} ref={fileInputRef} />
              Add Media Files
            </GoButton>
          </div>
        </div>
      )}
    </div>
    // </Dialog>
  );
}
const dropData = [
  {
    name: "Public",
    icon: <GlobeHemisphereWest size={20} />,
    desc: "Everyone on the platform can see your post",
  },
  {
    name: "Follows",
    icon: <CheckSquareOffset size={20} />,
    desc: "Only your followers can see your post.",
  },
  {
    name: "Private",
    icon: <Lock size={20} />,
    desc: "Only you can see your post.",
  },
];
