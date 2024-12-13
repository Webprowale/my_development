"use client";
import SettingsTab from "@/components/settings/SettingsTab";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, Wallet } from "@phosphor-icons/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const NotificationPage =()=>{

    const pathname = usePathname();
  const router = useRouter();
  const tab = useSearchParams().get("tab");

  console.log("the present tab is");
  console.log(tab);

    const notifications = [
        {
          title: "Alfie Solomons liked your video.",
          description: "55 secs ago",
          isRead : true,
          type:"reaction"
        },
        {
          title: "Gina Gray reacted to your photo.",
          description: "2 hour ago",
          isRead : true,
          type:"reaction"
        },
        {
          title: "commented on your photo",
          description: "2 hours ago",
          isRead : false,
          type:"reaction"
        },
        {
            title: "You just earned 50 GoPoints from referrals",
            description: "2 hours ago",
            isRead : true,
            type:"wallet"
          },
          {
            title: "You just earned 20 GoPoints from your purchase",
            description: "2 hours ago",
            isRead : false,
            type:"application"
          },
          {
            title: "Your subscription is expiring soon!",
            description: "2 hours ago",
            isRead : false,
            type:"wallet"
          },
      ]
    
  const links = [
    {
      id: 1,
      name: "All",
      tabName: "all",
      isActive: true,
    },
    {
      id: 2,
      name: "Posts",
      tabName: "posts",
      isActive: false,
    },
    {
      id: 3,
      name: "Applications",
      tabName: "applications",
      isActive: false,
    },
    {
        id: 4,
        name: "Trips",
        tabName: "trips",
        isActive: false,
      },
      {
        id: 5,
        name: "Wallet",
        tabName: "wallet",
        isActive: false,
      },
  ];

    return(
        <div className="space-6 bg-white rounded-sm">

            <div className="flex flex-col text-3xl font-bold p-4">
                <h3>Notifications</h3>
            </div>


      {/* Tab sections */}
     <SettingsTab tabList={links} />


   <div className={`my-4`}>

    {
        tab == "all" ? 
        <>
        {notifications.map((notification, index) => (
          <div className={`${notification.isRead? `bg-[#E7F0FF]`:``}`}>
                    <Separator className="" />
              <div className="flex items-center justify-between p-4">
                  <div
                    key={index}
                    className="flex flex-row gap-2 items-center py-2 last:mb-0 last:pb-0"
                  >
                     
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                     {
                         notification.type == "reaction"?
                         <img src="/assets/notification_image.png"/>:
                         <div className="rounded-full p-2 bg-[#CFE2FF]">
                          <Wallet size={32} color="#0D6EFD" weight="thin" />
                          </div>
                         
                     }
                    
      
                    <div className=" space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground py-2">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                   {
                      notification.type == "reaction"?
                       <div className=" rounded-full bg-[#FF0707] p-2">
                      <Heart size={12} color="#fff" weight="fill" />
                       </div>:
                      <div className="text-base text-[#0D6EFD] cursor-pointer">Go to Wallet</div>
                      
                   } 
      
                   
                
      
              </div>
              
              </div>
                ))}
   </>
          :
          <div className="flex flex-col items-center justify-center text-gray-500 px-4 py-20">
          <p className="relative">
            <img src="/assets/backgrpund_notif.svg" alt="Background" />
            <img src="/assets/empty_notification.png" alt="Notification" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </p>
          <p className="font-bold text-2xl">Nothing’s here yet</p>
          <p className="font-medium text-base">Kindly check back later</p>
        </div>       
    }
     
   

   </div>

        </div>
    );

}

export default NotificationPage;
