"use client";
import React, { useState } from "react";
import Image from "next/image";

import Recommendations from "../../components/right/recommendations";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { GoArrowRight } from "react-icons/go";
import { C_Button } from "./button";
import { MdVerified } from "react-icons/md";
import { getUserId } from "@/lib/get-userId";
import CurrentTrips from "./components/current-trips";
import Trending from "../../components/right/trending";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import Button from "@/components/goui/button";
import { getProfileAPi } from "@/axios/endpoints/user.endpoint";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import GoButton from "@/components/goui/button";
import Modal from "@/components/goui/modal";
import { Skeleton } from "@/components/ui/skeleton";
import EditProfile from "./edit-profile";

type Props = {};

function BioItem(props: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="grid gap-2 mt-2">
      <span className="flex items-center gap-1 text-gray-400 text-sm">
        {props.icon}
        <span>{props.label}</span>
      </span>
      <span className="text-black ml-2 text-sm">{props.value}</span>
    </div>
  );
}

function CardLayout(props: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-4">
    <h4 className="font-semibold md:text-sm text-xs my-4">{props.title}</h4>
      <div>{props.children}</div>
      <div className="flex justify-end w-full mt-5">
        <div className="text-primary600 flex justify-end items-center gap-1">
          <p className="text-sm font-semibold text-primary600">Show more</p>
          <ArrowRight weight="bold" className="text-primary600" />
        </div>
      </div>
    </div>
  );
}

function TripTimelinesCard(props: {
  image?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-2  border border-gray-200 rounded p-2">
      <Image
        src={props.image ?? "https://via.placeholder.com/200"}
        alt={props.title}
        width={200}
        height={200}
      />
      <p className="font-bold">{props.title}</p>
      <p className="line-clamp-2 text-gray-400 ">{props.description}</p>
      <Button className="w-full">View</Button>
    </div>
  );
}

const Sidebar = (isUser: any) => {
  const { id } = useParams();

  const { data, isLoading: isGetting } = useQuery({
    queryKey: ["getProfileAPi"],
    queryFn: () => getProfileAPi({ userId: `${id}` }),
    enabled: typeof id == "string",
    refetchOnWindowFocus: false,
  });
  const userid =getUserId()
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }
  return (
    <div className="space-y-4">
<Modal
isOpen={isModalOpen}
onClose={closeModal}
trigger={<button></button>}
className="my-modal "
left={false}
>
    <EditProfile  setModalVisibilty={setIsModalOpen}/>
</Modal>

{
  isGetting? 
  <div  className="bg-white p-4  w-[250px]">
    <Skeleton className="w-[20%] h-5" />
    <br />
    <div className="flex items-center gap-[1rem]">
    <Skeleton className="w-[100%] h-5" />
    <Skeleton className="w-[100%] h-5" />
    </div>
</div>
:
<div> 
{
        // @ts-ignore
       ( data?.city&&data?.dateOfBirth&&data?.bio)?
       <div className="bg-white p-4  w-[250px]">
       <p className="flex items-center gap-1 text-gray-400 text-md mb-4">
         <svg
           xmlns="http://www.w3.org/2000/svg"
           width="18"
           height="18"
           fill="none"
           viewBox="0 0 18 18"
         >
           <path
             fill="#667185"
             d="M15.75 3.375v1.969a.563.563 0 01-1.125 0V3.375h-1.969a.563.563 0 010-1.125h1.969a1.125 1.125 0 011.125 1.125zm-.563 8.719a.562.562 0 00-.562.562v1.969h-1.969a.563.563 0 000 1.125h1.969a1.125 1.125 0 001.125-1.125v-1.969a.563.563 0 00-.563-.562zm-9.843 2.531H3.375v-1.969a.563.563 0 00-1.125 0v1.969a1.125 1.125 0 001.125 1.125h1.969a.563.563 0 000-1.125zM2.812 5.906a.563.563 0 00.563-.562V3.375h1.969a.563.563 0 100-1.125H3.375A1.125 1.125 0 002.25 3.375v1.969a.563.563 0 00.563.562zm9.563 6.469a.562.562 0 01-.45-.224 3.656 3.656 0 00-5.85 0 .562.562 0 11-.9-.677A4.777 4.777 0 017.101 9.95a2.813 2.813 0 113.792 0c.765.331 1.43.857 1.929 1.524a.563.563 0 01-.448.901zM9 9.562a1.687 1.687 0 100-3.374 1.687 1.687 0 000 3.375z"
           ></path>
         </svg>
         <span className="text-gray-500">Bio</span>
       </p>

       <p>
        {data.bio}
       </p>

       <div className="flex w-full mt-2 gap-[1rem]">
         <BioItem
           icon={<IoLocationOutline />}
           label="Location"
           // @ts-ignore
           value={data?.city}
         />
           {/* @ts-ignore */}
         <BioItem icon={<CiCalendar />} label="Birthday" value={data?.dateOfBirth} />
       </div>

        {/* <div className="mt-4">
        <BioItem icon={<CiCalendar />} label="Joined" value="August 18, 2024" />
        </div> */}
       
     </div>:

     <div
     className="bg-white p-4 w-full text-center"
     >
      <div className="flex items-center justify-center">
      <svg width="250" height="200" viewBox="0 0 250 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="250" height="200" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M207 65C210.866 65 214 68.134 214 72C214 75.866 210.866 79 207 79H167C170.866 79 174 82.134 174 86C174 89.866 170.866 93 167 93H189C192.866 93 196 96.134 196 100C196 103.866 192.866 107 189 107H178.826C173.952 107 170 110.134 170 114C170 116.577 172 118.911 176 121C179.866 121 183 124.134 183 128C183 131.866 179.866 135 176 135H93C89.134 135 86 131.866 86 128C86 124.134 89.134 121 93 121H54C50.134 121 47 117.866 47 114C47 110.134 50.134 107 54 107H94C97.866 107 101 103.866 101 100C101 96.134 97.866 93 94 93H69C65.134 93 62 89.866 62 86C62 82.134 65.134 79 69 79H109C105.134 79 102 75.866 102 72C102 68.134 105.134 65 109 65H207ZM207 93C210.866 93 214 96.134 214 100C214 103.866 210.866 107 207 107C203.134 107 200 103.866 200 100C200 96.134 203.134 93 207 93Z" fill="#F3F7FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M99.942 133.192L101.432 133.141V154.14C101.432 154.615 101.819 155 102.296 155H154.136C154.613 155 155 154.615 155 154.14V82.155C155 80.4126 153.582 79 151.832 79H104.6C102.85 79 101.432 80.4126 101.432 82.155V97.1227L99.942 97.0711C99.767 97.065 99.5917 97.062 99.416 97.062C90.3809 97.062 83 105.124 83 115.132C83 125.139 90.3809 133.202 99.416 133.202C99.5917 133.202 99.767 133.199 99.942 133.192ZM100.107 126.29C99.8778 126.309 99.6473 126.318 99.416 126.318C93.9625 126.318 89.6432 121.263 89.6432 115.132C89.6432 109.001 93.9625 103.946 99.416 103.946C99.6473 103.946 99.8778 103.955 100.107 103.973L101.432 104.079V126.184L100.107 126.29Z" fill="white" stroke="#1F64E7" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M147 85.1816V103.5M147 109.182V113.925V109.182Z" stroke="#75A4FE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M67.1279 147H74M181.128 147H184M161 147H176.428M80 147H97.4541" stroke="#1F64E7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M128 35C125.333 39.2135 124 42.8802 124 46C124 51.5562 128.654 54.0444 128.654 60.063C128.654 63.1177 127.103 66.1507 124 69.1621" stroke="#75A4FE" stroke-width="2.5" stroke-linecap="round"/>
<path d="M116 46C115.128 51.5127 119 52.5322 119 57.4746C119 59.9831 118 62.4915 116 65" stroke="#75A4FE" stroke-width="2.5" stroke-linecap="round"/>
<path d="M134.795 43.4741C133.474 46.8933 134.216 48.9774 134.795 50.2041C136.033 52.8262 138 55.0896 138 57.7578C138 60.8568 136.932 63.8392 134.795 66.7051" stroke="#75A4FE" stroke-width="2.5" stroke-linecap="round"/>
<path d="M105 84C105 83.4477 105.448 83 106 83L125 83V152H106C105.448 152 105 151.552 105 151V84Z" fill="#E8F0FE"/>
</svg>

      </div>
      <h2 className="font-[600]">No Information yet!</h2>
      {
             userid===id?
             <div>
                   <p className="py-[.4rem]">Tell us a bit about yourself to complete your profile.</p>
                   <GoButton 
                  //  className="!text-[1.1rem]"
                   onClick={()=>{
                    console.log("hello world")
                    setIsModalOpen(true)
                   }}>
                    Edit Your  Profile
                   </GoButton>
             </div> 
:
<p>Check back for excitng info about this user</p>

      }
     </div>
      }
</div>

}



      <CurrentTrips />

      <CardLayout title="Trip Timelines">
        
      <div
     className="bg-white p-4 w-full text-center"
     >
      <div className="flex items-center justify-center">
     <img src="/Chill.svg" alt="" />
      </div>
      <h2 className="font-[600] translate-y-[-20px]">No Timelines yet!</h2>

     </div>
        {/* <div className="grid grid-cols-2 gap-2 ">
          {[...new Array(4)].map(() => (
            <TripTimelinesCard
              title={"Bahamas Family Trip"}
              description={"Creating memories in the Bahamas with my family"}
              image={"/assets/trip_timeline.png"}
            />
          ))}
        </div> */}
      </CardLayout>

      {/* {isUser ? <Recommendations /> : null} */}
    </div>
  );
};

export default Sidebar;
