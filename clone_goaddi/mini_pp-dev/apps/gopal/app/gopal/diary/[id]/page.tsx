//@ts-nocheck
"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";
import { C_Button } from "../../profile/[id]/button";
import { useDairyStore } from "@/store/useDiaryStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Book,
  Dot,
  PencilSimpleLine,
  Trash,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { DeleteDiary, DeleteFiles } from "@/axios/endpoints/diary.endpoints";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import Modal from "@/components/goui/modal";
import { CreateDiary } from "@/components/create/CreateDiaryPost";

export default function SingleDiary() {
  const { user } = useAuthStore((state) => ({ ...state })) as any;
  const user_id = user.userId;
  const params = useParams();
  const router = useRouter();

  console.log(params);
  const { id } = params;

  const [diary, setDiary] = useState([]);
  const { status, message, data, fetchDairyPosts, loading } = useDairyStore();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDairyPosts();
  }, [fetchDairyPosts]);

  useEffect(() => {
    setDiary(data.filter((diary: any) => diary?.id === id));
  }, [data]);

  useEffect(() => {
    console.log(refresh, diary.length < 1);
    if (refresh && diary.length < 1) {
      console.log("i ran");
      setRefresh(false);
      router.push(`/gopal/profile/${user_id}?tab=diary`);
    }
  }, [refresh]);

  const onClose = () => {
    // router.push(`/gopal/profile/${user_id}?tab=diary`);
    setIsModalOpen(false);
  };
  console.log(diary);
  if (loading) {
    return <div></div>;
  }

  async function deleteAFile(file_id) {
    // const diary_id = id;
    const fileId = file_id;
    const data = { id, fileId };
    console.log(data);
    const { message, status } = await DeleteFiles(data);
    console.log(message, status);
    try {
      if (status === true) {
        toast.success(message, {
          duration: 5000,
        });
        fetchDairyPosts();
        setRefresh(true);
        router.push(`/gopal/profile/${user_id}?tab=diary`);
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "There was an error processing your request.",
        duration: 5000,
      });
    }
  }

  async function handleDelete() {
    const data = { id };
    const { message, status } = await DeleteDiary(data);
    try {
      if (status === true) {
        toast.success(message, {
          duration: 5000,
        });
        fetchDairyPosts();
        setRefresh(true);
        router.push(`/gopal/profile/${user_id}`);
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "There was an error processing your request.",
        duration: 5000,
      });
    }
  }
  return (
    <>
      {diary?.map((diary, i) => (
        <div key={i} className="grid grid-col gap-4 bg-white p-4 h-full">
          <div className="my-3">
            <div className="w-full flex justify-start text-black">
              <C_Button
                variant="ghost"
                icon={<FaArrowLeft size={28} />}
                className="font-normal text-black"
                onClick={() =>
                  router.push(`/gopal/profile/${user_id}?tab=diary`)
                }
              ></C_Button>
            </div>
          </div>

          <div className="w-full  flex justify-between -mb-8 items-center">
            <div className="flex  w-full gap-1 items-center">
              <div className="flex flex-row gap-2 item-center">
                <GrGallery className="mt-1" />
                <span className="flex gap-2 justify-start items-center">
                  {" "}
                  {
                    <div key={i}>
                      {" "}
                      {diary.files.length} media item
                      {diary.files.length > 1 ? "s" : ""}
                    </div>
                  }
                </span>
              </div>

              {/* <div className="text-gray-500">| Last updated 2 hrs ago</div> */}
              <div className="text-gray-500">| {diary?.private}</div>
            </div>

            <div className="w-full flex justify-end gap-12">
              <C_Button
                variant="ghost"
                icon={<PencilSimpleLine size={20} />}
                className="font-normal cursor-pointer"
                onClick={() => {
                  // router.push(`/gopal/profile/${user_id}?tab=diary?create`);
                  setIsModalOpen(true);
                }}
              >
                Update Diary
              </C_Button>
              <C_Button
                variant="ghost"
                icon={<Trash size={20} />}
                className="font-normal cursor-pointer !text-[#FF0707] "
                onClick={() => {
                  // router.push(`/gopal/profile/${user_id}?tab=diary?create`);
                  handleDelete();
                }}
              >
                Delete Diary
              </C_Button>

              <Modal
                isOpen={isModalOpen}
                onClose={onClose}
                trigger={<button></button>}
                className="my-modal sm:max-w-[600px]"
                left={false}
              >
                <CreateDiary
                  text="Create a Diary Post"
                  icon={<Book size={24} />}
                  isOpen={isModalOpen}
                  onClose={onClose}
                  diary={diary}
                />
              </Modal>
            </div>
          </div>

          <div className=" grid grid-cols-3 gap-y-2 gap-x-2 mt-10">
            {diary?.files?.map((item, index) => {
              console.log(item);
              return (
                <div
                  key={index}
                  // href="/gopal/diary?view=232"
                  className="relative"
                >
                  <div className="absolute  rounded-full bg-[#FFFFFF33] top-2 right-2 ">
                    <Popover className="relative">
                      <PopoverTrigger asChild>
                        <div className="cursor-pointer backdrop-blur  w-[48px] h-[48px] bg-[#FFFFFF33] rounded-full shadow-lg flex items-center justify-center text-white text-[16px] font-bold relative">
                          <p className="absolute top-2">. . .</p>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-full flex flex-col ">
                        <C_Button
                          className="!border-none !outline-none text-black "
                          onClick={() => deleteAFile(item?.id)}
                        >
                          Delete
                        </C_Button>
                        <C_Button
                          className="!border-none !outline-none text-black "
                          //   onClick={() => handleDownload(item.url)}
                        >
                          {" "}
                          Download
                        </C_Button>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Image
                    src={item?.url}
                    alt={item?.id}
                    width={100}
                    height={100}
                    sizes="100"
                    className="w-full h-72 rounded object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
