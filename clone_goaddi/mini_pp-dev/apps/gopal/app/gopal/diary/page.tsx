"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";

import { C_Button } from "../profile/[id]/button";

export default function Diary() {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-col gap-4 bg-white p-4">
        <div className="my-3">
          <div className="w-full flex justify-start text-black">
            <C_Button
              variant="ghost"
              icon={<FaArrowLeft size={28} />}
              className="font-normal text-black"
              onClick={() => router.back()}
            ></C_Button>
          </div>
        </div>

        <div className="w-full h-16 flex justify-between -mb-8">
          <div>
            <div className="flex flex-rows-3 gap-1 items-center">
              <div className="flex flex-row gap-2 item-center">
                <GrGallery className="mt-1" />
                <span> 20 media items </span>
              </div>

              <div className="text-gray-500">| Last updated 2 hrs ago</div>
              <div className="text-gray-500">| Public</div>
            </div>
          </div>

          <C_Button
            variant="ghost"
            icon={<FaPlus size={20} />}
            className="font-normal"
          >
            Add Media
          </C_Button>
        </div>

        <div className=" grid grid-cols-3 gap-y-2 gap-x-2">
          {[...new Array(12)].map((_, index) => (
            <Link href="/gopal/diary?view=232">
              <img
                src="/assets/dairy_post.png"
                alt="saved image"
                className="w-full h-60 rounded"
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
