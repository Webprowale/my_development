import { FaArrowLeft, FaPlus } from "react-icons/fa6";

import { C_Button } from "../button";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import TimelineTab from "./timeline-tab";
import Link from "next/link";
import { useEffect, useState } from "react";
// import CreateModal from "@/components/create/create-post";
import Modal from "@/components/goui/modal";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditProfile from "../edit-profile";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus } from "@phosphor-icons/react";
import { ScrollArea } from "@/components/ui/scroll-area";

function SavedTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (name: string) => {
    setIsModalOpen(true);
    changeCollectionScreen(name);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const router = useRouter();

  const [pageExists, setPageExists] = useState(false);
  const searchParams = useSearchParams();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    // Check if the 'page' parameter exists in the URL query using window.location.search
    const queryParams = new URLSearchParams(window.location.search);
    const pageParamExists = queryParams.has("page");

    setPageExists(pageParamExists);
  }, []);

  const redirectToSavedPostTimeline = () => {
    setPageExists(true);
    router.push(`${id}?tab=saved&page=hiking`);
  };

  const redirectToSavedPost = () => {
    setPageExists(false);
    router.push(`${id}?tab=saved`);
  };

  const [collectionScreen, SetCollectionScreen] = useState("");

  const changeCollectionScreen = (name: string) => {
    SetCollectionScreen(name);
  };

  return (
    <>
      {pageExists ? (
        <div className="w-full px-6 py-3 space-y-4">
          <div className="w-full flex justify-start">
            <C_Button
              variant="ghost"
              icon={<FaArrowLeft size={28} />}
              className="font-normal text-black"
              onClick={redirectToSavedPost}
            ></C_Button>
          </div>

          <TimelineTab />
        </div>
      ) : (
        <>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            trigger={<></>}
            className="my-modal sm:max-w-[600px]"
            left={false}
          >
            {collectionScreen == "create_collection" ? (
              <>
                <img
                  className="absolute top-0 w-full h-fit z-[-1]"
                  src="/assets/modal-lines.svg"
                  alt="modal-lines"
                />

                <img alt="" src="/assets/profile_modal.svg" />

                <DialogHeader>
                  <DialogTitle className="mt-2 text-xl">
                    Create category
                  </DialogTitle>
                  <DialogDescription className="text-sm max-w-md mb-12">
                    Add new category to your saved post
                  </DialogDescription>

                  <div className="pt-5">
                    <div className="grid w-full max-full items-center gap-1.5">
                      <div className="grid grid-flow-row">
                        <div className="flex justify-between text-gray-500 m-0 p-0">
                          <Label htmlFor="category_name">Category Name</Label>
                          <span>50</span>
                        </div>
                        <Input
                          type="text"
                          id="category_name"
                          placeholder="Love"
                          className="p-4"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 w-full flex justify-end gap-4">
                    <C_Button
                      onClick={closeModal}
                      className="bg-blue-300/30 text-blue-700 px-12 py-3"
                    >
                      Cancel
                    </C_Button>

                    <C_Button
                      className="px-12 py-3 bg-blue-700 text-white"
                      onClick={() => SetCollectionScreen("add_to_collection")}
                    >
                      Save
                    </C_Button>
                  </div>
                </DialogHeader>
              </>
            ) : collectionScreen == "add_to_collection" ? (
              <>
                <div className=" font-semibold text-lg">Collections</div>
                <Separator />

                <div className="grid grid-flow-row gap-4">
                  <ScrollArea className="h-[350px] p-4">
                    {[...new Array(6)].map(() => (
                      <div className="flex gap-2 items-center my-4">
                        <img
                          alt=""
                          src="/assets/collections.png"
                          className="w-[120px] h-[100px]"
                        />
                        <span className="font-bold">Love</span>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </>
            ) : (
              <>
                <div className=" font-semibold text-lg">Collections</div>
                <Separator />

                <div className="flex flex-col gap-1 items-center py-16">
                  <div>
                    <img alt="" src="/assets/fi_8088791.svg" />
                  </div>

                  <div className="font-bold">No collection made yet</div>

                  <div>
                    <Link
                      href=""
                      className="text-blue-500 underline"
                      onClick={() => SetCollectionScreen("create_collection")}
                    >
                      Start here
                    </Link>
                  </div>
                </div>
              </>
            )}

            {collectionScreen == "add_to_collection" ? (
              <div className="sticky bg-[#F7F9FC] -m-6 ">
                <div
                  className="p-4 flex items-center gap-1 cursor-pointer"
                  onClick={() => changeCollectionScreen("create_collection")}
                >
                  <Plus size={32} /> Create
                </div>
              </div>
            ) : (
              ""
            )}
          </Modal>

          <div className="w-full px-6 py-3 space-y-4">
            <div className="w-full flex justify-end">
              <C_Button
                variant="ghost"
                icon={<FaPlus size={20} />}
                className="font-normal cursor-pointer"
                onClick={() => openModal("new-collection")}
              >
                Add New
              </C_Button>
            </div>

            <div className="bg-white p-4 w-full text-center flex flex-col gap-3 items-center justify-center">
              <div className="">
                <img src="/assets/profile/empty_bookmark.svg" alt="" />
              </div>
              <h2 className="font-[600]">Your bookmarks are empty</h2>
              <p className="text-gray-400 text-base">
                Bookmark your favourite posts to revisit them anytime
              </p>
            </div>
            {/* 
            <div className="w-full grid grid-cols-4 gap-4">
              <div className="w-full" onClick={redirectToSavedPostTimeline}>
                <img
                  src="/assets/saved/saved-tab(7).png"
                  alt="saved image"
                  className="w-52 h-50 rounded"
                />

                <div className="w-full flex justify-between items-center py-1 font-medium">
                  <span>Begin</span>
                  <span className="text-gray-400">0</span>
                </div>
              </div>

              <div className="w-full" onClick={redirectToSavedPostTimeline}>
                <div className="flex flex-col gap-1 rounded">
                  <div className="flex flex-rows-2 gap-1">
                    <div>
                      <img
                        src="/assets/saved/saved-tab(6).png"
                        alt="saved image"
                        className="w-full h-25"
                      />
                    </div>
                    <div>
                      <img
                        src="/assets/saved/saved-tab(5).png"
                        alt="saved image"
                        className="w-full h-25"
                      />
                    </div>
                  </div>

                  <img
                    src="/assets/saved/saved-tab(4).png"
                    alt="saved image"
                    className="w-52 h-25"
                  />
                </div>

                <div className="w-full flex justify-between items-center py-1 font-medium">
                  <span>Hiking</span>
                  <span className="text-gray-400">50</span>
                </div>
              </div>

              <div className="w-full" onClick={redirectToSavedPostTimeline}>
                <div className="flex flex-col gap-1">
                  <img
                    src="/assets/saved/saved-tab(3).png"
                    alt="saved image"
                    className="w-52 h-25"
                  />
                  <img
                    src="/assets/saved/saved-tab(2).png"
                    alt="saved image"
                    className="w-52 h-25"
                  />
                </div>

                <div className="w-full flex justify-between items-center py-1 font-medium">
                  <span>Love</span>
                  <span className="text-gray-400">2</span>
                </div>
              </div>

              <div className="w-full" onClick={redirectToSavedPostTimeline}>
                <img
                  src="/assets/saved/saved-tab(1).png"
                  alt="saved image"
                  className="w-52 h-50"
                />

                <div className="w-full flex justify-between items-center py-1 font-medium">
                  <span>Travel with friends</span>
                  <span className="text-gray-400">1</span>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-4 gap-4">
              <div className="w-full" onClick={redirectToSavedPostTimeline}>
                <div className="flex flex-col gap-1 rounded">
                  <div className="flex flex-rows-2 gap-1">
                    <div>
                      <img
                        src="/assets/saved/saved-tab(6).png"
                        alt="saved image"
                        className="w-full h-25 "
                      />
                    </div>

                    <div>
                      <img
                        src="/assets/saved/saved-tab(5).png"
                        alt="saved image"
                        className="w-full h-25 "
                      />
                    </div>
                  </div>

                  <img
                    src="/assets/saved/saved-tab(4).png"
                    alt="saved image"
                    className="w-52 h-25 "
                  />
                </div>

                <div className="w-full flex justify-between items-center py-1 font-medium">
                  <span>Hiking</span>
                  <span className="text-gray-400">50</span>
                </div>
              </div>

              <div className="w-full" onClick={redirectToSavedPostTimeline}>
                <div className="flex flex-col gap-1">
                  <img
                    src="/assets/saved/saved-tab(3).png"
                    alt="saved image"
                    className="w-52 h-25"
                  />
                  <img
                    src="/assets/saved/saved-tab(2).png"
                    alt="saved image"
                    className="w-52 h-25"
                  />
                </div>

                <div className="w-full flex justify-between items-center py-1 font-medium">
                  <span>Love</span>
                  <span className="text-gray-400">2</span>
                </div>
              </div>

              <div className="w-full" onClick={redirectToSavedPostTimeline}>
                <img
                  src="/assets/saved/saved-tab(7).png"
                  alt="saved image"
                  className="w-52 h-50 rounded"
                />

                <div className="w-full flex justify-between items-center py-1 font-medium">
                  <span>Begin</span>
                  <span className="text-gray-400">0</span>
                </div>
              </div>

              <div className="w-full" onClick={redirectToSavedPostTimeline}>
                <img
                  src="/assets/saved/saved-tab(1).png"
                  alt="saved image"
                  className="w-52 h-50"
                />

                <div className="w-full flex justify-between items-center py-1 font-medium">
                  <span>Travel with friends</span>
                  <span className="text-gray-400">1</span>
                </div>
              </div>
            </div> */}
          </div>
        </>
      )}

      {/* <CreateModal /> */}
    </>
  );
}

export default SavedTab;
