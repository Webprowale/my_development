import { BsChatDots } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";

import { C_Button } from "../button";
import Image from "next/image";
import {
  FaBookmark,
  FaCircleChevronLeft,
  FaCircleChevronRight,
} from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { MdOutlineFavorite } from "react-icons/md";
import { PiShareFatThin } from "react-icons/pi";
import { TbMessageCircle2 } from "react-icons/tb";

function TimelineCard() {
  return (
    <div className="space-y-2 px-10 mb-16">
      {/* post notification */}
      <p className="w-fit text-xs font-medium text-gray-500 flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-sm">
        <BsChatDots /> <span>You made a comment on this post</span>
      </p>

      {/* post card */}
      <div className="space-y-4 pb-4">
        <div className="w-full flex justify-between items-center">
          {/* post author */}
          <div className="flex items-center gap-2">
            <img
              src="https://randomuser.me/api/portraits/men/5.jpg"
              alt="profile"
              className="w-16 h-16 rounded-full"
            />
            <div className="grid gap-1">
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                <span>
                  2 hours ago | Massachusetts, United States of America | 203
                </span>
                <IoEyeOutline size={16} />
              </p>
            </div>
          </div>
          <SlOptionsVertical />
        </div>

        {/* post content */}
        <p className="line-clamp-3 relative">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto a
          dolore laboriosam et suscipit alias, quos rerum itaque dicta explicabo
          eos nobis nemo magnam minima, aperiam tempora quaerat optio quam
          doloribus exercitationem adipisci ad. Assumenda tempora, maiores modi
          est nobis illo, consectetur similique provident architecto impedit
          deserunt iure! Ab enim neque facere corrupti. Commodi sunt harum quam?
          Quibusdam, earum quae tempore magnam in quisquam eum ut reiciendis
          corporis necessitatibus, atque tenetur culpa sed numquam! Vero ex
          dolore amet eos nisi harum sunt molestias inventore atque iste!
          Debitis ea at numquam, hic a ex porro optio cupiditate harum ad
          doloremque adipisci!
          <C_Button
            variant="ghost"
            className="absolute bottom-0 right-0 bg-white px-2"
          >
            Read More...
          </C_Button>
        </p>

        {/* post image */}
        <div className="relative">
          <Image
            src="/assets/timeline-card-img.png"
            alt="timeline card image"
            width={800}
            height={450}
            className="rounded-lg"
          />

          <span className="absolute top-5 right-5 bg-gray-900/30 text-white py-2 px-3 rounded">
            1/5
          </span>

          <div className="absolute bottom-4 left-[44%] flex items-center gap-10 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
            <FaCircleChevronLeft color="white" size={24} />
            <FaCircleChevronRight color="white" size={24} />
          </div>
        </div>

        {/* post reactions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex gap-1">
              <MdOutlineFavorite size={24} color="red" />
              <span>120</span>
            </span>
            <span className="flex gap-1">
              <TbMessageCircle2 size={24} color="black" />
              <span>15</span>
            </span>
            <span className="flex gap-1">
              <PiShareFatThin size={24} color="black" />
              <span>32</span>
            </span>
            <span className="flex gap-1">
              <FaBookmark size={24} color="orange" />
              <span>32</span>
            </span>
          </div>

          <div className="flex items-center">
            <GoDotFill size={20} color="blue" />
            {[...new Array(3)].map((_, index) => (
              <GoDotFill size={20} color="lightblue" />
            ))}
          </div>
        </div>
      </div>

      {/* comments section */}
      <div className="flex flex-col justify-start gap-2 py-4 border-y-2 border-gray-200">
        <p className="font-medium pt-4">Comments</p>

        <div className="flex items-start gap-2">
          <img
            src="https://randomuser.me/api/portraits/women/11.jpg"
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="grid gap-0.5">
            <h3 className="text- font-semibold">John Doe</h3>
            <p className="">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo,
              quidem.
            </p>
            <div className="flex gap-4 text-sm pl">
              <span>21 mins</span>
              <span>32</span>
              <span>Reply</span>
            </div>
          </div>
        </div>

        <div className="w-full my-6 flex justify-center items-center gap-2 text-black">
          <span className="border-b-2 border-gray-200 w-24"></span>
          <span>View all 15 Comments</span>
          <span className="border-b-2 border-gray-200 w-24"></span>
        </div>
      </div>

      {/* post comment section */}
      <div className="border-b-2 border-gray-200 flex items-center">
        <textarea
          name="post_comment"
          id="post_comment"
          cols={30}
          rows={4}
          placeholder="Post your comment"
          className="w-full focus:outline-none border-none py-4"
        ></textarea>
        <C_Button className="bg-slate-300 px-16">Post</C_Button>
      </div>
    </div>
  );
}

export default TimelineCard;
