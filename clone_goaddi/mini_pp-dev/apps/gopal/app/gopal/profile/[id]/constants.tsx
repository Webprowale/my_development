import { TabsObj } from "./interface";
import DiaryTab from "./tabs/DiaryTab";
import SavedTab from "./tabs/saved-tab";
import TimelineTab from "./tabs/timeline-tab";

export const headerItems = [
  { name: "Home", link: "/", icon: "/assets/house.svg" },
  { name: "Dashboard", link: "/", icon: "/assets/chartpieslice.svg" },
  { name: "Wallet", link: "/", icon: "/assets/wallet.svg" },
  { name: "Plan Trip", link: "/", icon: "/assets/listchecks.svg" },
  { name: "Commission for Life", link: "/", icon: "/assets/handcoins.svg" },
  { name: "Notification", link: "/", icon: "/assets/bell.svg" },
  { name: "Cart", link: "/", icon: "/assets/basket.svg" },
  { name: "Create", link: "/", icon: "/assets/plussquare.svg" },
];

export const navitems = [
  { name: "Activities", icon: "/assets/roadhorizon.svg" },
  { name: "Hotels", icon: "/assets/buildings.svg" },
  { name: "Flights", icon: "/assets/airplanetilt.svg" },
  { name: "Study", icon: "/assets/student.svg" },
  { name: "Visa", icon: "/assets/newspaperclipping.svg" },
  { name: "Immigration", icon: "/assets/suitcaserolling.svg" },
  { name: "Medical", icon: "/assets/firstaidkit.svg" },
  { name: "Vacation Packages", icon: "/assets/package.svg" },
];

export const tripBuddies = [
  { name: "Jane Doe", image: "/assets/1@2x.png" },
  { name: "John Doe", image: "/assets/1-1@2x.png" },
  { name: "John Doe", image: "/assets/2@2x.png" },
];

export const tabs: TabsObj = {
  timeline: {
    title: "Timeline",
    content: <TimelineTab />,
  },
  diary: {
    title: "Diary",
    content: <DiaryTab />,
  },
  saved: {
    title: "Saved",
    content: <SavedTab />,
  },
};
