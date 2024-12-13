'use client';

import { dashboardLinks } from "@/data/navlinks";
import LeftSide from "../components/left/sidebar";
import dashboard from "./dashboard.module.css";
import TopBar from "@/components/navigations/desktop/topbar";
import { useMediaQuery } from 'react-responsive'
import { ArrowLeft, Article, Calendar, ClockCounterClockwise, GearSix, List, Shapes, SignOut, SquaresFour } from"@phosphor-icons/react";
import { CustomMobileMenu } from "@/components/navigations/mobile/TopNavbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');



  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const NavHeader = ()=>{
    let header = ''
    if(typeof window!=='undefined'){
      if(window.location.pathname ==='/gopal/dashboard/applications'){
        header = 'My Applications'
      }
      else if(window.location.pathname ==='/gopal/dashboard'){
        header ='My Dashboard'
      }
      else if(window.location.pathname ==='/gopal/dashboard/quotation'){
        header ='My Quotation'
      }
      else if(window.location.pathname ==='/gopal/dashboard/trip-planner'){
        header ='Trip Planner'
      }
      else if(window.location.pathname ==='/gopal/dashboard/travel-history'){
        header ='Trip History'
      }
    }
    return (
      <>
      {header}
      </>
    )
  }
  return (
    <div>
      {/* {typeof window!=='undefined'?window.location.pathname:''} */}
      {
        isDesktopOrLaptop?
        <div className="tracking-[-0.5px] bg-gray-100 w-full max-w-[1760px]  mx-auto flex flex-col justify-between ">
      <TopBar />
      <div className="flex justify-start justify-items-stretch items-start gap-10 w-full mt-28 px-12 flex-shrink-0 min-w-0">
        {/* left side */}
        <div className="hidden md:block left sticky top-28 left-0 z-20 flex-shrink">
          <LeftSide links={dashboardLinks} />
        </div>

        {/* The middle section */}
        <div className="middle max-w-full flex-auto w-full">{children}</div>
      </div>
    </div>
    :
    <div>
      <nav className="bg-white p-[1.125rem] flex justify-between items-center">
        <p className="font-[700] flex items-center gap-[0.75rem]">
        <ArrowLeft 
            color="#343330"
        size={25} />
          <span className=" text-[1.1rem]">
          <NavHeader />
          </span>
        </p>
        <List size={25}
          color="#343330"
        onClick={()=>setIsMenuOpen(true)}
        />
      </nav>
      <div className="overflow-hidden">
        {children}
      </div>

    </div>
      }
      <CustomMobileMenu 
              isOpen={isMenuOpen}
              closeMenu={closeMobileMenu}
              Links={[
                {
                  text:'Home',
                  icon:<Shapes size={20} />,
                  link:'/gopal/dashboard'
                },
                {
                  text:'My application',
                  icon:<SquaresFour size={20} />,
                  link:'/gopal/dashboard/applications?tab=flight'
                },
                {
                  text:'Quotation',
                  icon:<Article size={20} />,
                  link:'/gopal/dashboard/quotation'
                },
                {
                  text:'My Trip Planner',
                  icon: <Calendar size={20} />,
                  link:'/gopal/dashboard/trip-planner'
                },
                {
                  text:'Travel History',
                  icon:<ClockCounterClockwise size={20} />,
                  link:'/gopal/dashboard/travel-history'
                },
                // {
                //   text:'Settings',
                //   icon:<SignOut size={20} />,
                //   link:'#'
                // },
                
              ]}
      />
    </div>
  );
}

// 