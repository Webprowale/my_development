import Posts from "@/components/posts/dairy-post";
import Timeline from "../../../components/middle/timeline";
import { getUserId } from "@/lib/get-userId";
import { BsChatDots } from "react-icons/bs";
import PostLoader from "@/app/gopal/post-loader";
import { Suspense, useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { FaPlus } from "react-icons/fa6";
import { C_Button } from "../button";
import Link from "next/link";
import { CreateDiary } from "@/components/create/CreateDiaryPost";
import Modal from "@/components/goui/modal";
import { useRouter } from "next/navigation";
import { Book } from "@phosphor-icons/react/dist/ssr";
import { getPost } from "@/axios/endpoints/post.endpoint";
import { useDairyStore } from "@/store/useDiaryStore";
import Diaryloading from "@/app/gopal/diary/diary-loader";
import GoButton from "@/components/goui/button";

function DiaryTab() {
  const { user } = useAuthStore((state) => ({ ...state })) as any;

  const user_id = user.userId;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const onClose = () => {
    // router.push(`/gopal/profile/${user_id}?tab=diary`);
    setIsModalOpen(false);
  };
  const [diaryPost, setDiaryPost] = useState<any>([]);

  const { status, message, data, fetchDairyPosts, loading } = useDairyStore();

  useEffect(() => {
    fetchDairyPosts();
  }, [fetchDairyPosts]);
  if (loading) {
    return (
      <div className="w-full px-6 py-3 space-y-4">
        <Diaryloading />
      </div>
    );
  } else
    return (
      <>
        <div className="w-full px-6 py-3 space-y-4">
          <div className="w-full flex justify-end">
            <C_Button
              variant="ghost"
              icon={<FaPlus size={20} />}
              className="font-normal cursor-pointer"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Add New
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
              />
            </Modal>
          </div>
          {data?.length === 0 ? (
            <div className="bg-white p-4 w-full items-center justify-center text-center flex flex-col gap-3">
              <div className="">
                <img src="/assets/profile/empty_dairy.svg" alt="" />
              </div>
              <h2 className="font-[600]">No diary post yet!</h2>
              <p className="text-gray-400 text-base">
                Start sharing your experiences by creating a diary post!
              </p>
              <GoButton
                className="font-semibold cursor-pointer w-full md:text-lg text-base"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Create a diary post{" "}
              </GoButton>
            </div>
          ) : (
            <div className="w-full grid grid-cols-4 gap-2 ">
              {data?.map((diary: any, index: number) => {
                return (
                  <div className="w-full flex flex-col gap-2" key={index}>
                    <Link href={`/gopal/diary/${diary?.id}`}>
                      <img
                        src={diary?.cover}
                        alt={diary?.title}
                        className="h-60 rounded object-cover w-full"
                      />
                    </Link>

                    <div className="capitalize  line-clamp-1">
                      {" "}
                      {diary.title}
                    </div>
                    <div className="text-gray-500">
                      {" "}
                      {diary.files.length} media item
                      {diary.files.length > 1 ? "s" : ""}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* </Suspense> */}
      </>
    );
}

export default DiaryTab;
